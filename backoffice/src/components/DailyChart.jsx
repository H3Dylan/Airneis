import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const generateDates = (type) => {
    const dates = [];
    let date = new Date();
    
    if (type === 'daily') {
        for (let i = 6; i >= 0; i--) {
            const dateString = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0];
            dates.push(dateString);
        }
    } else if (type === 'weekly') {
        for (let i = 4; i >= 0; i--) {
            const weekString = `Semaine ${i + 1}`;
            dates.push(weekString);
        }
    }

    return dates;
};

const DailyChart = () => {
    const [period, setPeriod] = useState('daily'); // 'daily' ou 'weekly'
    const [data, setData] = useState([]);

    const fetchOrderData = async (dates) => {
        try {
            const responses = await Promise.all(
                dates.map(date => axios.get(`http://localhost:5050/api/orders/date/${date}`))
            );

            // Calculer le total pour chaque date
            const totals = responses.map(response => {
                const orders = response.data.data;
                const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);
                return { name: dates.shift(), total }; // Associe le total à la date
            });

            setData(totals);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        const dates = generateDates(period);
        fetchOrderData(dates);
    }, [period]);

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sales Chart</h1>
            <div style={{ marginBottom: '20px' }}>
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
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DailyChart;
