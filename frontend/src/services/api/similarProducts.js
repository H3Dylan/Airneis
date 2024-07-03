import apiClient from './api';

const getSimilarProducts = async (category, product) => {
    try {
        const response = await apiClient.get(`/articles/similar/${category}/${product}`);
        console.log("RESPONSE : ", response);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching similar products:', error);
        throw error;
    }
};

export default getSimilarProducts;