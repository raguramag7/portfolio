import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL 
  || "https://invigorating-tenderness-production-6b0d.up.railway.app"

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Contact ───────────────────────────────────────────────
export const contactAPI = {
  send:   (formData) => api.post("/api/contact", formData),
  getAll: ()         => api.get("/api/contact/messages"),
}

// ── Projects ──────────────────────────────────────────────
export const projectsAPI = {
  getAll:  ()           => api.get("/api/projects"),
  getById: (id)         => api.get(`/api/projects/${id}`),
  create:  (data)       => api.post("/api/projects", data),
  update:  (id, data)   => api.put(`/api/projects/${id}`, data),
  delete:  (id)         => api.delete(`/api/projects/${id}`),
}

// ── Auth ──────────────────────────────────────────────────
export const authAPI = {
  login:    (credentials) => api.post("/api/auth/login", credentials),
  register: (data)        => api.post("/api/auth/register", data),
}

// ── Skills ────────────────────────────────────────────────
export const skillsAPI = {
  getAll:  ()           => api.get("/api/skills"),
  create:  (data)       => api.post("/api/skills", data),
  update:  (id, data)   => api.put(`/api/skills/${id}`, data),
  delete:  (id)         => api.delete(`/api/skills/${id}`),
}

// ── Experience ────────────────────────────────────────────
export const experienceAPI = {
  getAll:  ()           => api.get("/api/experience"),
  create:  (data)       => api.post("/api/experience", data),
  update:  (id, data)   => api.put(`/api/experience/${id}`, data),
  delete:  (id)         => api.delete(`/api/experience/${id}`),
}

export default api
