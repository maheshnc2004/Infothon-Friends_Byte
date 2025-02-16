// src/api/ProduceService.js
export const getAllProduceDetails = async () => {
    // Dummy data to simulate an API response
    return Promise.resolve({
        data: [
            { id: 1, name: 'Apples', price: '1000₹', quantity: '5 kg' },
            { id: 2, name: 'Tomatoes', price: '400₹', quantity: '10 kg' },
            { id: 3, name: 'Carrots', price: '450₹', quantity: '8 kg' },
        ]
    });
};
