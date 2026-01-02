import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>ShopMERN</Link>
                <ul style={styles.links}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    <li>
                        <Link to="/cart" style={styles.cartLink}>
                            🛒 <span style={styles.cartBadge}>{cartCount}</span>
                        </Link>
                    </li>
                    {!user ? (
                        <>
                            <li><Link to="/login" style={styles.link}>Login</Link></li>
                            <li><Link to="/register" style={{ ...styles.link, ...styles.registerBtn }}>Register</Link></li>
                        </>
                    ) : (
                        <>
                            {user.role === 'admin' && (
                                <>
                                    <li><Link to="/admin/dashboard" style={styles.link}>Dashboard</Link></li>
                                    <li><Link to="/add-product" style={styles.link}>Add Product</Link></li>
                                </>
                            )}
                            <li><Link to="/my-orders" style={styles.link}>My Orders</Link></li>
                            <li><Link to="/profile" style={styles.link}>{user.name}</Link></li>
                            <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        height: 'var(--header-height)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: 'var(--primary)',
        letterSpacing: '-1px',
    },
    links: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    },
    link: {
        fontWeight: '500',
    },
    cartLink: {
        textDecoration: 'none',
        fontSize: '1.2rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    cartBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-10px',
        backgroundColor: '#ef4444',
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: '700',
        padding: '2px 5px',
        borderRadius: '10px',
        minWidth: '15px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    registerBtn: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        transition: 'background 0.2s',
    },
    user: {
        color: 'var(--text-muted)',
        fontWeight: '500',
    },
    logoutBtn: {
        background: 'none',
        border: '1px solid var(--border-light)',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--text-main)',
        fontWeight: '500',
    }
};

export default Navbar;
