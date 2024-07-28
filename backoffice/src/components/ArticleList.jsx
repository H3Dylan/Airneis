// src/components/ArticleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/articles');
                setArticles(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Articles</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article._id}>
                            <td>{article.name}</td>
                            <td>{article.price}</td>
                            <td>{article.stock}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
