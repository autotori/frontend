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
