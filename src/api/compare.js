const API_BASE = import.meta?.env?.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : '/api';

export async function compareWithAI(urls) {
  const response = await fetch(`${API_BASE}/ai/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urls }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Comparison failed: ${response.statusText}`);
  }

  return response.json();
}
