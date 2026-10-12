const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!response.ok) {
    const message = `Request failed (${response.status})`;
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export const taskApi = {
  getAll: () => request(API_URL),
  getById: (id) => request(`${API_URL}/${id}`),
  create: (task) => request(API_URL, {
    method: 'POST',
    body: JSON.stringify(task)
  }),
  update: (id, task) => request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task)
  }),
  remove: (id) => request(`${API_URL}/${id}`, { method: 'DELETE' })
};
