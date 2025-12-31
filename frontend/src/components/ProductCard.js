import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div style={styles.card}>
            <div style={styles.imageContainer}>
                <img
                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
                    alt={product.name}
                    style={styles.image}
                />
            </div>
            <div style={styles.content}>
                <div style={styles.category}>{product.category?.name || 'Category'}</div>
                <Link to={`/product/${product._id}`} style={styles.title}>{product.name}</Link>
                <p style={styles.description}>
                    {product.description.substring(0, 60)}...
                </p>
                <div style={styles.footer}>
                    <span style={styles.price}>${product.price}</span>
                    <button style={styles.button}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: 'var(--bg-card)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        border: '1px solid var(--border-light)'
    },
    imageContainer: {
        height: '200px',
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s'
    },
    content: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    category: {
        fontSize: '0.75rem',
        color: 'var(--primary)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.5rem'
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--text-main)',
        marginBottom: '0.5rem',
        display: 'block',
        textDecoration: 'none'
    },
    description: {
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
        marginBottom: '1.5rem',
        flex: 1
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: 'var(--text-main)'
    },
    button: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.875rem'
    }
};

export default ProductCard;
