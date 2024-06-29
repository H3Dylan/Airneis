import apiClient from './api';

const getProductById = async (product_id) => {
    try {
        const response = await apiClient.get(`/articles/${product_id}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export default getProductById;