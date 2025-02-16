import axios from 'axios';

const productClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',  // Update this base URL if necessary
});





export const createProductDetails = (farmerId, productData) => 
    productClient.post(`/farmers/${farmerId}/products`, productData)
        .then(response => {
            console.log("Product created successfully", response);
            return response;
        })
        .catch(error => {
            console.error("Error creating product", error);
            throw error; // Rethrow to handle it in the calling function
        });
