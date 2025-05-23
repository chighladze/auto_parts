import apiService from './api';

/**
 * Service for managing warehouse operations
 */
const warehouseService = {
  /**
   * Get all warehouses
   * @returns {Promise} Promise with the list of warehouses
   */
  getAllWarehouses: async () => {
    return apiService.get('/warehouses');
  },

  /**
   * Get a specific warehouse by ID
   * @param {number} id Warehouse ID
   * @returns {Promise} Promise with the warehouse data
   */
  getWarehouseById: async (id) => {
    return apiService.get(`/warehouses/${id}`);
  },
  
  /**
   * Get a specific warehouse by ID (alias for compatibility)
   * @param {number} id Warehouse ID
   * @returns {Promise} Promise with the warehouse data
   */
  getWarehouse: async (id) => {
    return apiService.get(`/warehouses/${id}`);
  },

  /**
   * Create a new warehouse
   * @param {object} warehouseData Warehouse data 
   * @returns {Promise} Promise with the created warehouse
   */
  createWarehouse: async (warehouseData) => {
    return apiService.post('/warehouses', warehouseData);
  },

  /**
   * Update an existing warehouse
   * @param {number} id Warehouse ID
   * @param {object} warehouseData Updated warehouse data
   * @returns {Promise} Promise with the updated warehouse
   */
  updateWarehouse: async (id, warehouseData) => {
    return apiService.put(`/warehouses/${id}`, warehouseData);
  },

  /**
   * Delete a warehouse
   * @param {number} id Warehouse ID
   * @returns {Promise} Promise with the result of the operation
   */
  deleteWarehouse: async (id) => {
    return apiService.delete(`/warehouses/${id}`);
  },

  /**
   * Get all sections in a warehouse
   * @param {number} warehouseId Warehouse ID
   * @returns {Promise} Promise with the list of sections
   */
  getWarehouseSections: async (warehouseId) => {
    return apiService.get(`/sections?warehouse_id=${warehouseId}`);
  }
};

export default warehouseService;