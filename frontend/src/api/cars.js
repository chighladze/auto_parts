import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const CarsApi = {
    getAll: () => axios.get(`${API_BASE_URL}/cars`),
    getById: (id) => axios.get(`${API_BASE_URL}/cars/${id}`),
    create: (data) => axios.post(`${API_BASE_URL}/cars`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/cars/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/cars/${id}`)
};
