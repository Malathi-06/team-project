import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={styles.title}>My Orders</h1>
            {error && <div style={styles.error}>{error}</div>}
            {orders.length === 0 ? (
                <div style={styles.empty}>
                    <p>You have no orders yet.</p>
                    <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div style={styles.tableCard} className="product-card">
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>DATE</th>
                                <th style={styles.th}>TOTAL</th>
                                <th style={styles.th}>PAID</th>
                                <th style={styles.th}>DELIVERED</th>
                                <th style={styles.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={styles.row}>
                                    <td style={styles.td}>{order._id.substring(0, 8)}...</td>
                                    <td style={styles.td}>{order.createdAt.substring(0, 10)}</td>
                                    <td style={styles.td}>${order.totalPrice.toFixed(2)}</td>
                                    <td style={styles.td}>
                                        {order.isPaid ? (
                                            <span style={styles.statusPaid}>Paid ({order.paidAt.substring(0, 10)})</span>
                                        ) : (
                                            <span style={styles.statusPending}>Pending</span>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        {order.isDelivered ? (
                                            <span style={styles.statusDelivered}>Delivered</span>
                                        ) : (
                                            <span style={styles.statusPending}>Pending</span>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <Link to={`/order/${order._id}`} style={styles.detailsBtn}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '2rem',
        color: 'var(--text-main)',
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
    },
    empty: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
    },
    tableCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    headerRow: {
        borderBottom: '2px solid var(--border-light)',
    },
    th: {
        padding: '1.2rem',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-muted)',
        fontWeight: '700',
    },
    row: {
        borderBottom: '1px solid var(--border-light)',
        transition: 'background 0.2s',
    },
    td: {
        padding: '1.2rem',
        fontSize: '0.95rem',
        color: 'var(--text-main)',
    },
    statusPaid: {
        color: '#059669',
        fontWeight: '600',
    },
    statusDelivered: {
        color: '#2563eb',
        fontWeight: '600',
    },
    statusPending: {
        color: '#d97706',
        fontWeight: '600',
    },
    detailsBtn: {
        backgroundColor: '#f1f5f9',
        color: 'var(--text-main)',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.2s',
    },
};

export default OrderHistoryPage;
