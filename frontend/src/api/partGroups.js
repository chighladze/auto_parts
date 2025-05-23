import apiService from "./api";

const API_URL = "/part-groups";

export const PartGroupsApi = {
  getAll: () => {
    return apiService.get(`${API_URL}/`);
  },

  getById: (id) => {
    return apiService.get(`${API_URL}/${id}/`);
  },

  create: (data) => {
    return apiService.post(`${API_URL}/`, data);
  },

  update: (id, data) => {
    return apiService.put(`${API_URL}/${id}/`, data);
  },

  delete: (id) => {
    return apiService.delete(`${API_URL}/${id}/`);
  },
};
