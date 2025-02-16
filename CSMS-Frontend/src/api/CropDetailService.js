import axios from 'axios';

const cropClient = axios.create({
  baseURL: 'http://localhost:9191/api/v1',
});

export const getAllCropDetails = () => cropClient.get('/crops');
export const getSingleCropDetails = (cropId) => cropClient.get(`/crops/${cropId}`);
export const createCropDetails = (farmerId, cropData) => cropClient.post(`/users/${farmerId}/crops`, cropData);
export const updateCropDetails = (cropData, cropId) => cropClient.put(`/crops/${cropId}`, cropData);
export const deleteCropDetails = (cropId) => cropClient.delete(`/crops/${cropId}`);
export const getAllImagesByCropID = (cropId) => cropClient.get(`/download/${cropId}/images`);
export const getAllCropsByUserId = (userId) => cropClient.get(`/users/${userId}/crops`);
