// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL 
  || "https://invigorating-tenderness-production-6b0d.up.railway.app";

export const contactAPI = {
  send: async (formData) => {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return response.json();
  },
};
