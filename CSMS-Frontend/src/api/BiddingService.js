import axios from "axios";
import { BASE_URL } from "./UserService";
export const getSingleCropDetails = () => { /* function code */ };
export const getAllBiddingsByCropId = () => { /* function code */ };

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const createBidding = (userId, carId, bidData) =>
    apiClient.post(`/user/${userId}/crop/{cropId}/biddings`, bidData)

export const deleteBidding = (biddingId) => apiClient.delete(`/biddings/${biddingId}`)

export const getAllBiddingsByUserId = (userId) => apiClient.get(`/users/${userId}/biddings`);

export const getAllBiddingsByCarId = (carId) => apiClient.get(`/crop/${carId}/biddings`);