import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div style={styles.section}>
                    <h3 style={styles.brand}>ShopMERN</h3>
                    <p style={styles.text}>
                        Premium tech products for the modern lifestyle.
                        Quality guaranteed.
                    </p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.title}>Links</h4>
                    <ul style={styles.list}>
                        <li><Link to="/" style={styles.link}>Home</Link></li>
                        <li><Link to="/login" style={styles.link}>Login</Link></li>
                        <li><Link to="/register" style={styles.link}>Register</Link></li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.title}>Contact</h4>
                    <ul style={styles.list}>
                        <li style={styles.text}>support@shopmern.com</li>
                        <li style={styles.text}>+1 (555) 123-4567</li>
                        <li style={styles.text}>123 Tech Street, CA</li>
                    </ul>
                </div>
            </div>
            <div style={styles.bottom}>
                <div className="container" style={styles.bottomContent}>
                    <p>&copy; 2024 ShopMERN. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'var(--text-main)',
        color: 'white',
        paddingTop: '4rem',
        marginTop: 'auto'
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        paddingBottom: '3rem'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1rem',
        color: 'white'
    },
    text: {
        color: '#94a3b8',
        lineHeight: '1.6',
        marginBottom: '0.5rem'
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '1.2rem',
        color: 'white'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
    },
    link: {
        color: '#94a3b8',
        transition: 'color 0.2s',
        ':hover': {
            color: 'white'
        }
    },
    bottom: {
        borderTop: '1px solid #1e293b',
        padding: '1.5rem 0',
        backgroundColor: '#020617'
    },
    bottomContent: {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem'
    }
};

export default Footer;
