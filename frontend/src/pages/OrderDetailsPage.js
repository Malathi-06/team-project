import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderService.getOrderById(id);
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load order details');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: '#dc2626' }}>{error}</div>;

    const itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={styles.title}>Order {order._id}</h1>
            <div style={styles.layout}>
                <div style={styles.detailsGroup}>
                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Shipping</h2>
                        <p style={styles.text}>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p style={styles.text}>
                            <strong>Email: </strong> {order.user.email}
                        </p>
                        <p style={styles.text}>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        <div style={order.isDelivered ? styles.successAlert : styles.dangerAlert}>
                            {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
                        </div>
                    </div>

                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Payment Method</h2>
                        <p style={styles.text}>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        <div style={order.isPaid ? styles.successAlert : styles.dangerAlert}>
                            {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
                        </div>
                    </div>

                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Order Items</h2>
                        <div style={styles.itemList}>
                            {order.orderItems.map((item, index) => (
                                <div key={index} style={styles.itemRow}>
                                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                                    <Link to={`/product/${item.product}`} style={styles.itemName}>{item.name}</Link>
                                    <div style={styles.itemQty}>
                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={styles.summaryCard} className="product-card">
                    <h2 style={styles.summaryTitle}>Order Summary</h2>
                    <div style={styles.summaryRow}>
                        <span>Items:</span>
                        <span>${itemsPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span>Shipping:</span>
                        <span>${order.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span>Tax:</span>
                        <span>${order.taxPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryTotal}>
                        <span>Total:</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                    {!order.isPaid && (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Payment gateway integration coming soon.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    title: {
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '2rem',
        color: 'var(--text-main)',
        wordBreak: 'break-all'
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2.5rem',
        alignItems: 'start',
    },
    detailsGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    section: {
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: 'var(--text-main)',
    },
    text: {
        fontSize: '1rem',
        color: 'var(--text-main)',
        lineHeight: '1.6',
        marginBottom: '0.5rem'
    },
    successAlert: {
        backgroundColor: '#d1fae5',
        color: '#065f46',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        marginTop: '1rem',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    dangerAlert: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        marginTop: '1rem',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    itemRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid var(--border-light)',
    },
    itemImage: {
        width: '50px',
        height: '50px',
        borderRadius: '6px',
        objectFit: 'cover',
    },
    itemName: {
        flex: 1,
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--text-main)',
        textDecoration: 'none',
    },
    itemQty: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    summaryCard: {
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        position: 'sticky',
        top: '100px',
    },
    summaryTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '1rem',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    summaryTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
        marginBottom: '2rem',
        fontSize: '1.4rem',
        fontWeight: '800',
        color: 'var(--primary)',
    },
};

export default OrderDetailsPage;
