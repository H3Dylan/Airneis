import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/orders');
                setOrders(response.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleCreateOrder = () => {
        history.push('/admin/orders/create');
    };

    const handleEditOrder = (id) => {
        history.push(`/admin/orders/edit/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!orders || orders.length === 0) {
        return <div>No orders found</div>;
    }

    return (
        <div>
            <h1>Orders</h1>
            <button onClick={handleCreateOrder}>Create New Order</button>
            <table>
                <thead>
                    <tr>
                        <th>Articles</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                {order.articles.map((item, index) => (
                                    <div key={index}>
                                        {item.name}: {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleEditOrder(order._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
