import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const BrandsApi = {
  getAll: () => axios.get(`${API_BASE_URL}/brands/`),
  getById: (id) => axios.get(`${API_BASE_URL}/brands/${id}/`),
  create: (data) => axios.post(`${API_BASE_URL}/brands/`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/brands/${id}/`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/brands/${id}/`),
};
