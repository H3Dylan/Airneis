// src/components/AdminHome.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'recharts'; // Utiliser Recharts pour les graphiques

const AdminHome = () => {
    const [dailySales, setDailySales] = useState({ dates: [], totals: [] });
    const [weeklySales, setWeeklySales] = useState({ weeks: [], totals: [] });

    useEffect(() => {
        // Charger les ventes quotidiennes
        const fetchDailySales = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/orders/daily-sales');
                setDailySales(response.data.data);
            } catch (error) {
                console.error('Error fetching daily sales:', error);
            }
        };

        // Charger les ventes hebdomadaires
        const fetchWeeklySales = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/orders/weekly-sales');
                setWeeklySales(response.data.data);
            } catch (error) {
                console.error('Error fetching weekly sales:', error);
            }
        };

        fetchDailySales();
        fetchWeeklySales();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/categories">Manage Categories</Link></li>
                    <li><Link to="/admin/articles">Manage Articles</Link></li>
                    <li><Link to="/admin/orders">Manage Orders</Link></li>
                </ul>
            </nav>
            <div>
                <h2>Sales - Last 7 Days</h2>
                <Bar
                    data={{
                        labels: dailySales.dates,
                        datasets: [
                            {
                                label: 'Total Sales',
                                data: dailySales.totals,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            }
                        ]
                    }}
                    options={{
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
            <div>
                <h2>Sales - Last 5 Weeks</h2>
                <Bar
                    data={{
                        labels: weeklySales.weeks,
                        datasets: [
                            {
                                label: 'Total Sales',
                                data: weeklySales.totals,
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1,
                            }
                        ]
                    }}
                    options={{
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default AdminHome;
