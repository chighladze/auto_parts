import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const PartSubgroupsApi = {
    getAll: (groupId = null) => {
        const params = groupId ? { group_id: groupId } : {};
        return axios.get(`${API_BASE_URL}/part-subgroups`, { params });
    },
    getById: (id) => axios.get(`${API_BASE_URL}/part-subgroups/${id}`),
    create: (data) => axios.post(`${API_BASE_URL}/part-subgroups`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/part-subgroups/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/part-subgroups/${id}`)
};
