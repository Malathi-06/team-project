import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                marginBottom: '3rem',
                background: 'linear-gradient(to bottom, transparent, rgba(var(--primary), 0.1))'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, white, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Welcome to Nexus Commerce
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'hsl(var(--text-muted))', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Discover our premium collection of next-generation gadgets, fashion, and home essentials.
                </p>
                <Link to="/catalog" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Shop Now
                </Link>
            </section>

            {/* Featured Products */}
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Featured Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {products.map(product => (
                        <div key={product._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                height: '200px',
                                background: '#2a2a2a',
                                borderRadius: 'var(--radius-sm)',
                                marginBottom: '1rem',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x400/333/fff?text=No+Image'}
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                            <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '1rem', flex: 1 }}>
                                {product.description.substring(0, 60)}...
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'hsl(var(--primary))' }}>
                                    ${product.basePrice.toFixed(2)}
                                </span>
                                <Link to={`/product/${product._id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
