import { useEffect, useMemo, useState } from 'react';

const CONSENT_STORAGE_KEY = 'autotori-cookie-consent-v1';

function buildConsentPayload({ analytics, marketing }) {
  return {
    necessary: true,
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    version: '2026-03-31',
    acceptedAt: new Date().toISOString()
  };
}

function CookieConsentBanner({ onOpenCookiesPolicy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existingConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!existingConsent) {
      setIsVisible(true);
    }
  }, []);

  const payloadPreview = useMemo(
    () => buildConsentPayload({ analytics, marketing }),
    [analytics, marketing]
  );

  const persistConsent = (payload) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    setIsVisible(false);
  };

  const acceptAll = () => {
    persistConsent(buildConsentPayload({ analytics: true, marketing: true }));
  };

  const rejectNonEssential = () => {
    persistConsent(buildConsentPayload({ analytics: false, marketing: false }));
  };

  const savePreferences = () => {
    persistConsent(payloadPreview);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Evästeasetukset</h3>
          <p className="mt-2 text-sm text-gray-600 leading-6">
            Käytämme välttämättömiä evästeitä sivuston toimintaan sekä valinnaisia evästeitä analytiikkaan ja
            markkinointiin. Voit hyväksyä kaikki, hylätä valinnaiset tai valita asetukset.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 flex items-start gap-2.5">
              <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span>
                <span className="font-medium text-gray-900">Välttämättömät evästeet</span>
                <span className="block text-xs text-gray-500 mt-0.5">Aina käytössä sivuston perustoimintaan.</span>
              </span>
            </label>

            <label className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="font-medium text-gray-900">Analytiikkaevästeet</span>
                <span className="block text-xs text-gray-500 mt-0.5">Auttaa parantamaan sivuston toimivuutta.</span>
              </span>
            </label>

            <label className="rounded-xl border border-gray-200 p-3 text-sm text-gray-700 flex items-start gap-2.5 sm:col-span-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="font-medium text-gray-900">Markkinointievästeet</span>
                <span className="block text-xs text-gray-500 mt-0.5">Mahdollistaa mainonnan kohdentamisen ja mittauksen.</span>
              </span>
            </label>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2.5">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Hyväksy kaikki
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Vain välttämättömät
            </button>
            <button
              type="button"
              onClick={savePreferences}
              className="inline-flex items-center justify-center rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Tallenna valinnat
            </button>
            <button
              type="button"
              onClick={() => onOpenCookiesPolicy?.()}
              className="inline-flex items-center justify-center rounded-lg px-1 py-2.5 text-sm text-blue-700 underline hover:text-blue-900"
            >
              Lue evästekäytäntö
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentBanner;
