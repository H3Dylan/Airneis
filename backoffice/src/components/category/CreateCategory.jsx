import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5050/api/categories/create', { name });
            history.push('/admin/categories');
        } catch (error) {
            console.error('Error creating category:', error);
            setError('Error creating category.');
        }
    };

    return (
        <div>
            <h1>Create New Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Create Category</button>
            </form>
        </div>
    );
};

export default CreateCategory;
