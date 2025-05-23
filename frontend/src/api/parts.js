import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const PartsApi = {
    getAll: (params = {}) => axios.get(`${API_BASE_URL}/parts`, { params }),
    getById: (id) => axios.get(`${API_BASE_URL}/parts/${id}`),
    create: (data) => axios.post(`${API_BASE_URL}/parts`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/parts/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/parts/${id}`),
    searchByIdentifier: (identifier) => axios.get(`${API_BASE_URL}/parts/search/?query=${identifier}`),
    getByBarcode: (barcode) => axios.get(`${API_BASE_URL}/parts/barcode/${barcode}`),
    getByQrCode: (qrCode) => axios.get(`${API_BASE_URL}/parts/qr-code/${qrCode}`)
};