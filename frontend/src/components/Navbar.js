import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>ShopMERN</Link>
                <ul style={styles.links}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    {!user ? (
                        <>
                            <li><Link to="/login" style={styles.link}>Login</Link></li>
                            <li><Link to="/register" style={{ ...styles.link, ...styles.registerBtn }}>Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li style={styles.user}>Hi, {user.name}</li>
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
        color: 'var(--text-main)',
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
