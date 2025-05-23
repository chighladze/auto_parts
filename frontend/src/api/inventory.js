import apiService from "./api";

const API_URL = "/inventory";

export const InventoryApi = {
  getAll: (params = {}) => {
    return apiService.get(API_URL, { params });
  },

  getById: (id) => {
    return apiService.get(`${API_URL}/${id}`);
  },

  create: (data) => {
    return apiService.post(API_URL, data);
  },

  update: (id, data) => {
    return apiService.put(`${API_URL}/${id}`, data);
  },

  updateQuantity: (id, quantity) => {
    return apiService.patch(`${API_URL}/${id}/quantity`, { quantity });
  },

  updatePrice: (id, price) => {
    return apiService.patch(`${API_URL}/${id}/price`, { price });
  },

  delete: (id) => {
    return apiService.delete(`${API_URL}/${id}`);
  },

  findByPartId: (partId) => {
    return apiService.get(API_URL, { params: { part_id: partId } });
  },

  findBySectionId: (sectionId) => {
    return apiService.get(API_URL, { params: { section_id: sectionId } });
  },

  getLowStockItems: (threshold) => {
    return apiService.get(API_URL, { params: { threshold } });
  },
};
