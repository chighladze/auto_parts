import apiService from './api';

/**
 * Service for managing inventory operations
 */
const inventoryService = {
  /**
   * Get all inventory items
   * @returns {Promise} Promise with the list of inventory items
   */
  getAllInventory: async () => {
    return apiService.get('/inventory');
  },

  /**
   * Get a specific inventory item by ID
   * @param {number} id Inventory ID
   * @returns {Promise} Promise with the inventory data
   */
  getInventoryById: async (id) => {
    return apiService.get(`/inventory/${id}`);
  },

  /**
   * Create a new inventory entry
   * @param {object} inventoryData Inventory data
   * @returns {Promise} Promise with the created inventory
   */
  createInventory: async (inventoryData) => {
    return apiService.post('/inventory', inventoryData);
  },

  /**
   * Update an existing inventory entry
   * @param {number} id Inventory ID
   * @param {object} inventoryData Updated inventory data
   * @returns {Promise} Promise with the updated inventory
   */
  updateInventory: async (id, inventoryData) => {
    return apiService.put(`/inventory/${id}`, inventoryData);
  },

  /**
   * Delete an inventory entry
   * @param {number} id Inventory ID
   * @returns {Promise} Promise with the result of the operation
   */
  deleteInventory: async (id) => {
    return apiService.delete(`/inventory/${id}`);
  },

  /**
   * Get inventory items with low stock
   * @param {number} threshold Stock threshold to consider as "low"
   * @returns {Promise} Promise with the list of low stock items
   */
  getLowStockItems: async (threshold = 10) => {
    return apiService.get(`/inventory?threshold=${threshold}`);
  },
  
  /**
   * Get inventory items by part ID
   * @param {number} partId Part ID
   * @returns {Promise} Promise with inventory items for the part
   */
  findByPartId: async (partId) => {
    return apiService.get(`/inventory?part_id=${partId}`);
  },
  
  /**
   * Get inventory items by section ID
   * @param {number} sectionId Section ID
   * @returns {Promise} Promise with inventory items in the section
   */
  findBySectionId: async (sectionId) => {
    return apiService.get(`/inventory?section_id=${sectionId}`);
  },

  /**
   * Update inventory quantity
   * @param {number} id Inventory ID
   * @param {number} quantity New quantity value
   * @returns {Promise} Promise with the updated inventory
   */
  updateQuantity: async (id, quantity) => {
    return apiService.put(`/inventory/${id}`, { quantity });
  },

  /**
   * Get inventory by part ID
   * @param {number} partId Part ID
   * @returns {Promise} Promise with the inventory data
   */
  getInventoryByPart: async (partId) => {
    return apiService.get(`/inventory/part/${partId}`);
  },

  /**
   * Get inventory by section ID
   * @param {number} sectionId Section ID
   * @returns {Promise} Promise with the inventory data
   */
  getInventoryBySection: async (sectionId) => {
    return apiService.get(`/inventory/section/${sectionId}`);
  },

  /**
   * Get part locations
   * @param {number} partId Part ID
   * @returns {Promise} Promise with the locations where the part is stored
   */
  getPartLocations: async (partId) => {
    return apiService.get(`/inventory/part/${partId}/locations`);
  }
};

export default inventoryService;