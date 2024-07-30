// src/components/EditArticle.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditArticle = () => {
    const { id } = useParams();
    const history = useHistory();
    const [article, setArticle] = useState({
        name: '',
        price: 0,
        stock: 0,
        shortDescription: '',
        detailsDescription: '',
        materials: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/articles/${id}`);
                setArticle(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching article:', error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(prevArticle => ({ ...prevArticle, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5050/api/articles/update/${id}`, article);
            history.push('/admin/articles');
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Article</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={article.name} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={article.price} onChange={handleChange} />
                </label>
                <label>
                    Stock:
                    <input type="number" name="stock" value={article.stock} onChange={handleChange} />
                </label>
                <label>
                    Short Description:
                    <textarea name="shortDescription" value={article.shortDescription} onChange={handleChange}></textarea>
                </label>
                <label>
                    Details Description:
                    <textarea name="detailsDescription" value={article.detailsDescription} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditArticle;
