import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data.products || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
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

            {/* Product Grid */}
            <div className="container" style={{ paddingBottom: '4rem' }}>
                <h2 style={styles.sectionTitle}>Featured Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
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
        marginBottom: '1rem',
        color: 'var(--text-main)'
    }
};

export default HomePage;
