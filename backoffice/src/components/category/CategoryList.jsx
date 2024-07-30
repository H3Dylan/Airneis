// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const history = useHistory();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/categories');
                setCategories(response.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/api/categories/delete/${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedCategories.map(id =>
                axios.delete(`http://localhost:5050/api/categories/delete/${id}`)
            ));
            setCategories(prevCategories => prevCategories.filter(category => !selectedCategories.includes(category._id)));
            setSelectedCategories([]);
        } catch (error) {
            console.error('Error deleting selected categories:', error);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedCategories(categories.map(category => category._id));
        } else {
            setSelectedCategories([]);
        }
    };

    const handleSelectCategory = (e, id) => {
        if (e.target.checked) {
            setSelectedCategories(prev => [...prev, id]);
        } else {
            setSelectedCategories(prev => prev.filter(categoryId => categoryId !== id));
        }
    };

    const handleCreateButtonClick = () => {
        history.push('/admin/categories/create');
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedCategories = React.useMemo(() => {
        let sortableItems = [...categories];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [categories, sortConfig]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!categories || categories.length === 0) {
        return <div>No categories found</div>;
    }

    return (
        <div>
            <h1>Categories</h1>
            <button onClick={handleCreateButtonClick}>Create New Category</button>
            <button onClick={handleDeleteSelected} disabled={selectedCategories.length === 0}>
                Delete Selected
            </button>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedCategories.length === categories.length}
                            />
                        </th>
                        <th onClick={() => requestSort('name')}>
                            Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCategories.map((category) => (
                        <tr key={category._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectCategory(e, category._id)}
                                    checked={selectedCategories.includes(category._id)}
                                />
                            </td>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => history.push(`/admin/categories/edit/${category._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(category._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
