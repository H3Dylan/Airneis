import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

// Données de test pour les 7 derniers jours
const dailyData = [
    { name: '2024-08-20', total: 500 },
    { name: '2024-08-21', total: 600 },
    { name: '2024-08-22', total: 550 },
    { name: '2024-08-23', total: 700 },
    { name: '2024-08-24', total: 400 },
    { name: '2024-08-25', total: 650 },
    { name: '2024-08-26', total: 750 },
];

// Données de test pour les 5 dernières semaines
const weeklyData = [
    { name: 'Semaine 1', total: 3000 },
    { name: 'Semaine 2', total: 3200 },
    { name: 'Semaine 3', total: 2800 },
    { name: 'Semaine 4', total: 3500 },
    { name: 'Semaine 5', total: 4000 },
];

// Données de test pour les ventes par produit
const productData = {
    daily: [
        { name: 'Produit A', total: 1200 },
        { name: 'Produit B', total: 800 },
        { name: 'Produit C', total: 900 },
        { name: 'Produit D', total: 600 },
    ],
    weekly: [
        { name: 'Produit A', total: 6000 },
        { name: 'Produit B', total: 4000 },
        { name: 'Produit C', total: 4500 },
        { name: 'Produit D', total: 3000 },
    ],
};

const AdminHome = () => {
    const [period, setPeriod] = useState('daily'); // 'daily' ou 'weekly'

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    const salesData = period === 'daily' ? dailyData : weeklyData;
    const productChartData = productData[period];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/admin/categories" style={linkStyle}>
                    Manage Categories
                </Link>
                <Link to="/admin/articles" style={linkStyle}>
                    Manage Articles
                </Link>
                <Link to="/admin/orders" style={linkStyle}>
                    Manage Orders
                </Link>
            </nav>
            <div style={{ marginTop: '20px' }}>
                <label htmlFor="period-selector" style={{ marginRight: '10px' }}>Select Period:</label>
                <select
                    id="period-selector"
                    value={period}
                    onChange={handlePeriodChange}
                    style={{ padding: '5px' }}
                >
                    <option value="daily">Last 7 Days</option>
                    <option value="weekly">Last 5 Weeks</option>
                </select>
            </div>
            <div style={{ marginTop: '20px', width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '20px', width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={productChartData}
                            dataKey="total"
                            nameKey="name"
                            outerRadius={150}
                            label
                        >
                            {productChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const linkStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center'
};

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default AdminHome;
