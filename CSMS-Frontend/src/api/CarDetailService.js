import axios from "axios";

const cropClient = axios.create({
    baseURL: "http://localhost:9191/api/v1"
});

// Get details of a single crop by its ID
export const getSingleCropDetails = (cropId) => cropClient.get(`/crops/${cropId}`);

// Get all crop details
export const getAllCropDetails = () => cropClient.get(`/crops`);

// Create a new crop (farmer adds a crop)
export const createCropDetails = (farmerId, cropData) =>
    cropClient.post(`/users/${farmerId}/crops`, cropData);

// Update crop details
export const updateCropDetails = (cropData, cropId) => cropClient.put(`/crops/${cropId}`, cropData);

// Delete a crop by its ID
export const deleteCropDetails = (cropId) => cropClient.delete(`/crops/${cropId}`);

// Get all images for a specific crop
export const getAllImagesByCropID = (cropId) => cropClient.get(`/download/${cropId}/images`);

// Get all crops added by a specific farmer (user)
export const getAllCropsByUserId = (userId) => cropClient.get(`/users/${userId}/crops`);

// Search for crops by a keyword (e.g., crop type, name)
export const getAllCropDetailsByKeyword = (keyword) => cropClient.get(`/crops/search?keyword=${keyword}`);
