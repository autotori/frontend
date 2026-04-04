export const COMPARE_STORAGE_KEY = 'autotori-compare-selection-v1';
export const MAX_COMPARE_CARS = 5;

function normalizeCarForCompare(car) {
  const listingUrl = car?.listingUrl ? String(car.listingUrl).trim() : '';
  if (!listingUrl) return null;

  const title =
    car?.name ||
    car?.title ||
    `${car?.make || ''} ${car?.model || ''}`.trim() ||
    'Auto';

  return {
    id: listingUrl,
    listingUrl,
    title,
    source: car?.source || '',
    priceEur: car?.priceEur ?? car?.price ?? null,
    imageUrl: car?.image || car?.thumbnailUrl || ''
  };
}

export function getCompareSelection() {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.listingUrl === 'string' && item.listingUrl.trim())
      .slice(0, MAX_COMPARE_CARS);
  } catch {
    return [];
  }
}

export function saveCompareSelection(selection) {
  localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selection.slice(0, MAX_COMPARE_CARS)));
}

export function clearCompareSelection() {
  localStorage.removeItem(COMPARE_STORAGE_KEY);
}

export function getCompareSelectionUrls() {
  return getCompareSelection().map((item) => item.listingUrl);
}

export function toggleCompareSelection(car) {
  const normalized = normalizeCarForCompare(car);
  if (!normalized) {
    return { selection: getCompareSelection(), changed: false, reason: 'missing-url' };
  }

  const current = getCompareSelection();
  const exists = current.some((item) => item.listingUrl === normalized.listingUrl);

  if (exists) {
    const next = current.filter((item) => item.listingUrl !== normalized.listingUrl);
    saveCompareSelection(next);
    return { selection: next, changed: true, action: 'removed' };
  }

  if (current.length >= MAX_COMPARE_CARS) {
    return { selection: current, changed: false, reason: 'max-reached' };
  }

  const next = [...current, normalized];
  saveCompareSelection(next);
  return { selection: next, changed: true, action: 'added' };
}
