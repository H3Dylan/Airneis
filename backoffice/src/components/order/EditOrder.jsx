// src/components/order/EditOrder.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditOrder = () => {
    const { id } = useParams();
    const [userId, setUserId] = useState('');
    const [articles, setArticles] = useState([]);
    const [articleOptions, setArticleOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState('');
    const [currentArticle, setCurrentArticle] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const history = useHistory();

    useEffect(() => {
        // Fetch the order data
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/orders/${id}`);
                const order = response.data.data;
                setUserId(order.userId);
                setArticles(order.articles);
                setTotalPrice(order.totalPrice);
                setStatus(order.status);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        // Fetch articles for selection
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/articles');
                setArticleOptions(response.data.data || []);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchOrder();
        fetchArticles();
    }, [id]);

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
            await axios.put(`http://localhost:5050/api/orders/update/${id}`, {
                userId,
                articles,
                totalPrice,
                status
            });
            history.push('/admin/orders');
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div>
            <h1>Edit Order</h1>
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
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit">Update Order</button>
            </form>

            <div>
                <h3>Add Article to Order</h3>
                <div>
                    <label>Article:</label>
                    <select
                        value={currentArticle}
                        onChange={(e) => setCurrentArticle(e.target.value)}
                        required
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
                        required
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
            </div>
        </div>
    );
};

export default EditOrder;
