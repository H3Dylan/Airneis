// services/api/getArticlesByCategory.js
import axios from 'axios';

const getArticlesByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`/api/articles/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        throw error;
    }
};

export default getArticlesByCategory;
