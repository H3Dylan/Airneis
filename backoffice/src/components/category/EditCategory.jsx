import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditCategory = () => {
    const [category, setCategory] = useState({ name: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/categories/${id}`);
                setCategory(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category:', error);
                setError('Error fetching category.');
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5050/api/categories/update/${id}`, category);
            history.push('/admin/categories');
        } catch (error) {
            console.error('Error updating category:', error);
            setError('Error updating category.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;
