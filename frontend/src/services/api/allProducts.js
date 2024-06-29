import apiClient from './api';

const getAllProducts = async () => {
    try {
        const response = await apiClient.get('/articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export default getAllProducts;