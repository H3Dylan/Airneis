import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const history = useHistory();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/articles');
                setArticles(response.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/api/articles/delete/${id}`);
            setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(
                selectedArticles.map(id => axios.delete(`http://localhost:5050/api/articles/delete/${id}`))
            );
            setArticles(prevArticles => prevArticles.filter(article => !selectedArticles.includes(article._id)));
            setSelectedArticles([]); 
        } catch (error) {
            console.error('Error deleting articles:', error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedArticles(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleCreateButtonClick = () => {
        history.push('/admin/articles/create');
    };

    const handleSort = (column) => {
        const newSortDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newSortDirection);
    };

    const sortedArticles = [...articles].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!articles || articles.length === 0) {
        return <div>No articles found</div>;
    }

    return (
        <div>
            <h1>Articles</h1>
            <button onClick={handleCreateButtonClick}>Create New Article</button>
            <button onClick={handleBulkDelete} disabled={selectedArticles.length === 0}>
                Delete Selected
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th onClick={() => handleSort('name')}>
                            Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => handleSort('price')}>
                            Price {sortColumn === 'price' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => handleSort('stock')}>
                            Stock {sortColumn === 'stock' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedArticles.map((article) => (
                        <tr key={article._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedArticles.includes(article._id)}
                                    onChange={() => handleCheckboxChange(article._id)}
                                />
                            </td>
                            <td>{article.name}</td>
                            <td>{article.price}</td>
                            <td>{article.stock}</td>
                            <td>
                                <button onClick={() => history.push(`/admin/articles/edit/${article._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(article._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
