import api from './apiConfig';

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get('/auth/user');
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getDepartments = async () => {
    const response = await api.get('/auth/departments');
    return response.data;
};