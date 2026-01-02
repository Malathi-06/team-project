import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts({ search, category });
            setProducts(data.products || []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, category]);

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Loading amazing products...</div>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            Error: {error}
        </div>
    );

    return (
        <>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div className="container" style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Tech That <span style={{ color: 'var(--accent)' }}>Empowers</span>
                    </h1>
                    <p style={styles.heroText}>
                        Discover the latest gadgets and accessories designed to elevate your lifestyle.
                        Premium quality, unbeatable prices.
                    </p>
                    <button style={styles.heroBtn}>Shop Collection</button>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="container" style={styles.filterBar}>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        style={styles.filterInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div style={styles.categoryBox}>
                    <select
                        style={styles.filterInput}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Product Grid Area */}
            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div style={styles.gridHeader}>
                    <h2 style={styles.sectionTitle}>Featured Products</h2>
                    {user && user.role === 'admin' && (
                        <button
                            className="btn btn-primary"
                            style={styles.addProductBtn}
                            onClick={() => navigate('/add-product')}
                        >
                            + Add Product
                        </button>
                    )}
                </div>

                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        No products found matching your criteria.
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} onRefresh={fetchProducts} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const styles = {
    hero: {
        backgroundColor: 'var(--text-main)', // Dark background
        color: 'white',
        padding: '6rem 0',
        marginBottom: '3rem',
        borderRadius: '0 0 2rem 2rem',
        textAlign: 'center'
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto'
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        lineHeight: 1.1,
        letterSpacing: '-2px'
    },
    heroText: {
        fontSize: '1.25rem',
        color: '#94a3b8',
        marginBottom: '2.5rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    heroBtn: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        borderRadius: '50px',
        cursor: 'pointer',
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)'
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '0',
        color: 'var(--text-main)'
    },
    filterBar: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        marginTop: '-1.5rem',
        position: 'relative',
        zIndex: 5
    },
    filterInput: {
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--border-light)',
        fontSize: '0.9rem',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 'var(--shadow-sm)'
    },
    searchBox: {
        flex: 2
    },
    categoryBox: {
        flex: 1
    },
    gridHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    addProductBtn: {
        width: 'auto',
        padding: '0.75rem 1.5rem',
        boxShadow: 'var(--shadow-md)'
    }
};

export default HomePage;
