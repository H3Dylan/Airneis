// src/components/CreateOrder.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateOrder = () => {
    const [userId, setUserId] = useState('');
    const [articles, setArticles] = useState([]);
    const [articleOptions, setArticleOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentArticle, setCurrentArticle] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const history = useHistory();

    useEffect(() => {
        // Fetch articles for selection
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/articles');
                setArticleOptions(response.data.data || []);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const handleAddArticle = () => {
        const selectedArticle = articleOptions.find(a => a._id === currentArticle);
        if (selectedArticle) {
            setArticles([...articles, { articleId: selectedArticle._id, quantity: currentQuantity }]);
            setTotalPrice(totalPrice + (selectedArticle.price * currentQuantity));
            setCurrentArticle('');
            setCurrentQuantity(1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5050/api/orders/create', {
                userId,
                articles,
                totalPrice
            });
            history.push('/admin/orders'); // Redirection après succès
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <h1>Create Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input
                        type="number"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(Number(e.target.value))}
                        required
                        disabled
                    />
                </div>
                <div>
                    <label>Article:</label>
                    <select
                        value={currentArticle}
                        onChange={(e) => setCurrentArticle(e.target.value)}
                    >
                        <option value="">Select an article</option>
                        {articleOptions.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name} - ${item.price}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={currentQuantity}
                        onChange={(e) => setCurrentQuantity(Number(e.target.value))}
                    />
                </div>
                <button type="button" onClick={handleAddArticle}>Add Article</button>
                <div>
                    <h3>Articles List</h3>
                    <ul>
                        {articles.map((a, index) => (
                            <li key={index}>
                                Article ID: {a.articleId}, Quantity: {a.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default CreateOrder;
