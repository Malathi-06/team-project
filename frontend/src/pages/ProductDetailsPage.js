import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!product) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                ← Back to Products
            </Link>

            <div style={styles.grid}>
                <div style={styles.imageSection}>
                    <img
                        src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        style={styles.image}
                    />
                </div>

                <div style={styles.infoSection}>
                    <div style={styles.category}>{product.category?.name}</div>
                    <h1 style={styles.title}>{product.name}</h1>
                    <div style={styles.price}>${product.price}</div>

                    <div style={styles.stockStatus}>
                        Status: <span style={{ color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <p style={styles.description}>{product.description}</p>

                    {product.stock > 0 && (
                        <div style={styles.actions}>
                            <div style={styles.qtySelector}>
                                <label style={{ fontWeight: '600' }}>Quantity:</label>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    style={styles.select}
                                >
                                    {[...Array(Math.min(product.stock, 10)).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="btn btn-primary btn-hover"
                                style={styles.cartBtn}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
    },
    imageSection: {
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-light)'
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block'
    },
    infoSection: {
        paddingTop: '1rem'
    },
    category: {
        color: 'var(--primary)',
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        letterSpacing: '0.1em',
        marginBottom: '1rem'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '1rem',
        color: 'var(--text-main)',
        lineHeight: 1.1
    },
    price: {
        fontSize: '2rem',
        fontWeight: '800',
        color: 'var(--primary)',
        marginBottom: '1.5rem'
    },
    stockStatus: {
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
        color: 'var(--text-muted)'
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: 'var(--text-muted)',
        marginBottom: '2.5rem',
        whiteSpace: 'pre-line'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    qtySelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    select: {
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid var(--border-light)',
        fontSize: '1rem',
        backgroundColor: 'white'
    },
    cartBtn: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)'
    }
};

export default ProductDetailsPage;
