import apiService from './api';

/**
 * Service for managing section operations
 */
const sectionService = {
  /**
   * Get all sections
   * @returns {Promise} Promise with the list of sections
   */
  getAllSections: async () => {
    console.log('Getting all sections...');
    return apiService.get('/sections');
  },

  /**
   * Get a specific section by ID
   * @param {number} id Section ID
   * @returns {Promise} Promise with the section data
   */
  getSectionById: async (id) => {
    console.log(`Getting section by ID: ${id}`);
    return apiService.get(`/sections/${id}`);
  },

  /**
   * Get a specific section by ID (alias for compatibility)
   * @param {number} id Section ID
   * @returns {Promise} Promise with the section data
   */
  getSection: async (id) => {
    console.log(`Getting section: ${id}`);
    return apiService.get(`/sections/${id}`);
  },

  /**
   * Create a new section
   * @param {object} sectionData Section data
   * @returns {Promise} Promise with the created section
   */
  createSection: async (sectionData) => {
    console.log('Creating section with data:', sectionData);
    return apiService.post('/sections', sectionData);
  },

  /**
   * Update an existing section
   * @param {number} id Section ID
   * @param {object} sectionData Updated section data
   * @returns {Promise} Promise with the updated section
   */
  updateSection: async (id, sectionData) => {
    console.log(`Updating section ${id} with data:`, sectionData);
    return apiService.put(`/sections/${id}`, sectionData);
  },

  /**
   * Delete a section
   * @param {number} id Section ID
   * @returns {Promise} Promise with the result of the operation
   */
  deleteSection: async (id) => {
    console.log(`Deleting section: ${id}`);
    return apiService.delete(`/sections/${id}`);
  },

  /**
   * Get sections by warehouse ID
   * @param {number} warehouseId Warehouse ID
   * @returns {Promise} Promise with the list of sections
   */
  getSectionsByWarehouse: async (warehouseId) => {
    console.log(`Getting sections for warehouse: ${warehouseId}`);
    return apiService.get(`/sections?warehouse_id=${warehouseId}`);
  },

  /**
   * Get all parts in a section
   * @param {number} sectionId Section ID
   * @returns {Promise} Promise with the list of parts
   */
  getSectionParts: async (sectionId) => {
    console.log(`Getting parts for section: ${sectionId}`);
    return apiService.get(`/inventory?section_id=${sectionId}`);
  }
};

export default sectionService;