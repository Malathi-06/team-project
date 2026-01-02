import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productService from '../services/productService';

const ProductCard = ({ product, onRefresh }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            try {
                await productService.deleteProduct(product._id);
                if (onRefresh) onRefresh();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete product');
            }
        }
    };

    return (
        <div style={styles.card} className="product-card">
            {user && user.role === 'admin' && (
                <div style={styles.adminBadge}>
                    <button
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                        style={styles.iconBtn}
                        className="btn-hover"
                        title="Edit Product"
                    >
                        ✎
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{ ...styles.iconBtn, color: '#ef4444' }}
                        className="btn-hover"
                        title="Delete Product"
                    >
                        🗑
                    </button>
                </div>
            )}
            <div style={styles.imageContainer}>
                <img
                    src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    style={styles.image}
                    className="card-image"
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
                    <button className="btn-primary btn-hover" style={styles.button}>Add to Cart</button>
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
    adminBadge: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 10
    },
    iconBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontSize: '1rem',
        transition: 'background 0.2s'
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
        fontSize: '1.4rem',
        fontWeight: '800',
        color: 'var(--primary)'
    },
    button: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '10px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)'
    },
    actionBtnHover: {
        backgroundColor: 'var(--primary-dark)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 15px rgba(37, 99, 235, 0.25)'
    }
};

export default ProductCard;
