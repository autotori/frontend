const API_BASE = '/api';

export async function searchCars(params) {
  const queryString = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryString.append(key, value);
    }
  });

  const response = await fetch(`${API_BASE}/search?${queryString}`);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  return response.json();
}

export async function getSources() {
  const response = await fetch(`${API_BASE}/sources`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sources: ${response.statusText}`);
  }
  return response.json();
}

export async function submitContactForm(payload) {
  const formData = new FormData();

  formData.append('name', payload.name || '');
  formData.append('email', payload.email || '');
  formData.append('phone', payload.phone || '');
  formData.append('inquiryType', payload.inquiryType || 'general_query');
  formData.append('message', payload.message || '');
  formData.append('acceptedPolicies', String(Boolean(payload.acceptedPolicies)));
  formData.append('marketingConsent', String(Boolean(payload.marketingConsent)));
  formData.append('consentVersion', payload.consentVersion || '2026-03-30');

  if (payload.companyName) formData.append('companyName', payload.companyName);
  if (payload.adBudget) formData.append('adBudget', payload.adBudget);
  if (payload.campaignTimeline) formData.append('campaignTimeline', payload.campaignTimeline);

  if (Array.isArray(payload.adSpaces)) {
    payload.adSpaces.forEach((space) => {
      formData.append('adSpaces', space);
    });
  }

  if (Array.isArray(payload.adFiles)) {
    payload.adFiles.forEach((file) => {
      formData.append('adFiles', file);
    });
  }

  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}
