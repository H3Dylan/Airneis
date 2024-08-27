import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateArticle = () => {
    const [newArticle, setNewArticle] = useState({
        category: '',
        name: '',
        price: '',
        stock: '',
        shortDescription: '',
        detailsDescription: '',
        materials: ''
    });
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5050/api/articles/create', newArticle);
            console.log(response.data);
            history.push('/admin/articles'); 
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div>
            <h2>Create New Article</h2>
            <form onSubmit={handleCreateArticle}>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newArticle.category}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newArticle.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newArticle.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={newArticle.stock}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="shortDescription"
                    placeholder="Short Description"
                    value={newArticle.shortDescription}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="detailsDescription"
                    placeholder="Details Description"
                    value={newArticle.detailsDescription}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Create Article</button>
            </form>
        </div>
    );
};

export default CreateArticle;
