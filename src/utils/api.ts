const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const buildUrl = (endpoint: string): string => {
  if (endpoint.startsWith('http')) return endpoint;
  return `${BASE_URL}${endpoint}`;
};

export const get = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`GET ${endpoint} failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const post = async <T>(endpoint: string, data?: any): Promise<T> => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined
  });

  if (!response.ok) {
    throw new Error(`POST ${endpoint} failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const patch = async <T>(endpoint: string, data?: any): Promise<T> => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined
  });

  if (!response.ok) {
    throw new Error(`PATCH ${endpoint} failed: ${response.status}`);
  }
  return (await response.json()) as T;
};
