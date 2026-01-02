import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsData, categoriesData, usersData] = await Promise.all([
                    productService.getProducts({ limit: 0 }),
                    categoryService.getCategories(),
                    userService.getUsers()
                ]);

                setStats({
                    products: productsData.totalProducts || productsData.products.length,
                    categories: categoriesData.length,
                    users: usersData.length
                });
            } catch (err) {
                console.error('Failed to fetch dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const dashboardCards = [
        {
            title: 'Products',
            count: stats.products,
            icon: '📦',
            link: '/',
            btnText: 'Manage Products',
            color: '#2563eb'
        },
        {
            title: 'Categories',
            count: stats.categories,
            icon: '📂',
            link: '/add-product', // Temporary until a categories page exists
            btnText: 'Manage Categories',
            color: '#10b981'
        },
        {
            title: 'Inventory',
            count: 'Check',
            icon: '📊',
            link: '/add-product',
            btnText: 'Add New Product',
            color: '#f59e0b'
        }
    ];

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading Dashboard...</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <p style={styles.subtitle}>Overview of your store's performance and management</p>
            </div>

            <div style={styles.grid}>
                {dashboardCards.map((card, index) => (
                    <div key={index} style={{ ...styles.card, borderTop: `5px solid ${card.color}` }} className="product-card">
                        <div style={styles.cardHeader}>
                            <span style={styles.cardIcon}>{card.icon}</span>
                            <h3 style={styles.cardTitle}>{card.title}</h3>
                        </div>
                        <div style={styles.cardBody}>
                            <div style={styles.cardCount}>{card.count}</div>
                            <Link to={card.link} className="btn btn-primary btn-hover" style={{ backgroundColor: card.color, width: '100%', textAlign: 'center' }}>
                                {card.btnText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ ...styles.title, fontSize: '1.75rem' }}>Quick Actions</h2>
                <div style={styles.actionGrid}>
                    <Link to="/add-product" style={styles.actionLink} className="product-card">
                        <span style={styles.actionIcon}>➕</span>
                        <span>Add New Product</span>
                    </Link>
                    <button onClick={() => alert('Feature coming soon!')} style={styles.actionLink} className="product-card">
                        <span style={styles.actionIcon}>🏷️</span>
                        <span>Create Category</span>
                    </button>
                    <button onClick={() => alert('Feature coming soon!')} style={styles.actionLink} className="product-card">
                        <span style={styles.actionIcon}>👥</span>
                        <span>View Users</span>
                    </button>
                    <button onClick={() => alert('Feature coming soon!')} style={styles.actionLink} className="product-card">
                        <span style={styles.actionIcon}>⚙️</span>
                        <span>Store Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    header: {
        marginBottom: '3rem',
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: 'var(--text-main)',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '1.1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    cardIcon: {
        fontSize: '2rem'
    },
    cardTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'var(--text-main)',
        margin: 0
    },
    cardBody: {
        textAlign: 'center'
    },
    cardCount: {
        fontSize: '3rem',
        fontWeight: '800',
        color: 'var(--text-main)',
        marginBottom: '1rem'
    },
    actionGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem'
    },
    actionLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        textDecoration: 'none',
        color: 'var(--text-main)',
        fontWeight: '600',
        gap: '1rem',
        border: '1px solid var(--border-light)',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.2s'
    },
    actionIcon: {
        fontSize: '1.5rem'
    }
};

export default AdminDashboardPage;
