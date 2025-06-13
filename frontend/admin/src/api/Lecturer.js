import api from './apiConfig';

export const createCourse = async (courseData) => {
    const response = await api.post('/lecturer/courses', courseData);
    return response.data;
};

export const getCourses = async () => {
    const response = await api.get('/lecturer/courses');
    return response.data;
};

export const generateQRCode = async (courseId) => {
    const response = await api.post('/lecturer/qr-code', { courseId });
    return response.data;
};

export const setEnrollmentKey = async (courseId, enrollmentKey) => {
    const response = await api.post('/lecturer/enrollment-key', { courseId, enrollmentKey });
    return response.data;
};

export const getAttendance = async (courseId) => {
    const response = await api.get(`/lecturer/attendance/${courseId}`);
    return response.data;
};