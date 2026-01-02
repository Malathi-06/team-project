import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        }
    }, [paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const order = await orderService.createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });
            clearCart();
            // In a real app, we'd go to order details or payment
            alert('Order placed successfully!');
            navigate(`/`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={styles.title}>Place Order</h1>
            <div style={styles.layout}>
                <div style={styles.detailsGroup}>
                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Shipping</h2>
                        <p style={styles.text}>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Payment Method</h2>
                        <p style={styles.text}>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>

                    <div style={styles.section} className="product-card">
                        <h2 style={styles.sectionTitle}>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div style={styles.itemList}>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={styles.itemRow}>
                                        <img src={item.image} alt={item.name} style={styles.itemImage} />
                                        <Link to={`/product/${item._id}`} style={styles.itemName}>{item.name}</Link>
                                        <div style={styles.itemQty}>
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                        <span>${shippingPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span>Tax:</span>
                        <span>${taxPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.summaryTotal}>
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-hover"
                        style={styles.button}
                        disabled={cartItems.length === 0}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>
                </div>
            </div>
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
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        lineHeight: '1.6',
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
    button: {
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
    },
};

export default PlaceOrderPage;
