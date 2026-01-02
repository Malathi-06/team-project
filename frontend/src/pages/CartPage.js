import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={styles.title}>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div style={styles.emptyCart}>
                    <p>Your cart is empty.</p>
                    <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div style={styles.layout}>
                    <div style={styles.itemList}>
                        {cartItems.map((item) => (
                            <div key={item._id} style={styles.cartItem} className="product-card">
                                <div style={styles.itemImageContainer}>
                                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} style={styles.itemImage} />
                                </div>
                                <div style={styles.itemDetails}>
                                    <Link to={`/product/${item._id}`} style={styles.itemName}>{item.name}</Link>
                                    <div style={styles.itemPrice}>${item.price}</div>
                                </div>
                                <div style={styles.itemActions}>
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        style={styles.select}
                                    >
                                        {[...Array(item.stock).keys()].slice(0, 10).map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item._id)}
                                        style={styles.removeBtn}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.summaryCard} className="product-card">
                        <h2 style={styles.summaryTitle}>Order Summary</h2>
                        <div style={styles.summaryRow}>
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):</span>
                            <span style={styles.summaryPrice}>${subtotal}</span>
                        </div>
                        <button
                            className="btn btn-primary btn-hover"
                            style={styles.checkoutBtn}
                            onClick={checkoutHandler}
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
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
    emptyCart: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    cartItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        gap: '1.5rem',
    },
    itemImageContainer: {
        width: '100px',
        height: '100px',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--text-main)',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '0.5rem',
    },
    itemPrice: {
        color: 'var(--primary)',
        fontWeight: '700',
        fontSize: '1rem',
    },
    itemActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    select: {
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        border: '1px solid var(--border-light)',
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#ef4444',
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
        marginBottom: '2rem',
        fontSize: '1.1rem',
    },
    summaryPrice: {
        fontWeight: '700',
        color: 'var(--text-main)',
    },
    checkoutBtn: {
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
    },
};

export default CartPage;
