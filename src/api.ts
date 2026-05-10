const BASE_URL = 'http://localhost:3001/api';

function getToken(): string | null {
  return localStorage.getItem('traveloop_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('traveloop_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('traveloop_token');
  localStorage.removeItem('traveloop_user');
}

export function getUser(): any {
  const u = localStorage.getItem('traveloop_user');
  return u ? JSON.parse(u) : null;
}

export function setUser(user: any) {
  localStorage.setItem('traveloop_user', JSON.stringify(user));
}

async function request(method: string, path: string, body?: any) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  } catch (err: any) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error('Backend server is not reachable. Please ensure the backend is running on http://localhost:3001');
    }
    throw err;
  }
}

export const api = {
  get: (path: string) => request('GET', path),
  post: (path: string, body?: any) => request('POST', path, body),
  delete: (path: string) => request('DELETE', path),
};
