import apiService from './api';

/**
 * Service for managing auto parts operations
 */
const partService = {
  /**
   * Get all parts
   * @returns {Promise} Promise with the list of parts
   */
  getAllParts: async () => {
    return apiService.get('/parts');
  },

  /**
   * Get part by ID
   * @param {number} id Part ID
   * @returns {Promise} Promise with the part data
   */
  getPartById: async (id) => {
    return apiService.get(`/parts/${id}`);
  },

  /**
   * Get part by barcode
   * @param {string} barcode Barcode
   * @returns {Promise} Promise with the part data
   */
  getPartByBarcode: async (barcode) => {
    return apiService.get(`/parts/barcode/${barcode}`);
  },

  /**
   * Get part by QR code
   * @param {string} qrCode QR code
   * @returns {Promise} Promise with the part data
   */
  getPartByQRCode: async (qrCode) => {
    return apiService.get(`/parts/qr-code/${qrCode}`);
  },

  /**
   * Create new part
   * @param {object} partData Part data
   * @returns {Promise} Promise with the created part
   */
  createPart: async (partData) => {
    return apiService.post('/parts', partData);
  },

  /**
   * Update part
   * @param {number} id Part ID
   * @param {object} partData Updated part data
   * @returns {Promise} Promise with the updated part
   */
  updatePart: async (id, partData) => {
    return apiService.put(`/parts/${id}`, partData);
  },

  /**
   * Add part to section
   * @param {number} partId Part ID
   * @param {number} sectionId Section ID
   * @param {number} quantity Quantity
   * @returns {Promise} Promise with the inventory data
   */
  addPartToSection: async (partId, sectionId, quantity) => {
    return apiService.post('/inventory', {
      part_id: partId,
      section_id: sectionId,
      quantity: quantity
    });
  }
};

export default partService;