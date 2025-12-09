import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Transcript endpoints
export const transcriptAPI = {
  getAll: () => api.get('/api/transcripts'),
  getById: (id) => api.get(`/api/transcripts/${id}`),
  create: (data) => api.post('/api/transcripts', data),
  delete: (id) => api.delete(`/api/transcripts/${id}`)
};

// Summary endpoints
export const summaryAPI = {
  getAll: () => api.get('/api/summaries'),
  getById: (callId) => api.get(`/api/summaries/${callId}`),
  regenerate: (callId) => api.post(`/api/summaries/${callId}/regenerate`)
};

// Agent endpoints
export const agentAPI = {
  getAll: () => api.get('/api/agents'),
  getById: (id) => api.get(`/api/agents/${id}`),
  create: (data) => api.post('/api/agents', data)
};

// Health check
export const healthAPI = {
  check: () => api.get('/api/health')
};

export default api;
