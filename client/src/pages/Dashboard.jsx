import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('grid'); // 'grid' | 'form'
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = () => {
        setLoading(true);
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = (product) => {
        const url = product._id
            ? `http://localhost:5000/api/products/${product._id}`
            : 'http://localhost:5000/api/products';
        const method = product._id ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(() => {
                fetchProducts();
                setView('grid');
                setEditingProduct(null);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        if (!window.confirm('Delete this product?')) return;
        fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
            .then(() => fetchProducts());
    };

    if (view === 'form') {
        return <ProductForm existingProduct={editingProduct} onSave={handleSave} onCancel={() => { setView('grid'); setEditingProduct(null); }} />;
    }

    return (
        <main className="container fade-in" style={{ paddingBottom: '4rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Product Catalog</h2>
                    <p style={{ color: 'hsl(var(--text-muted))' }}>Manage your premium inventory</p>
                </div>
                <button className="btn btn-primary" onClick={() => setView('form')}>+ Add Product</button>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading catalog...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {products.map(product => (
                        <div key={product._id} className="card icon-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '200px', background: 'hsl(var(--bg-hover))', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
                                {product.images && product.images[0] ? (
                                    <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--text-muted))' }}>No Image</div>
                                )}
                                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                                    {product.sku}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{product.description.substring(0, 100)}...</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${product.price}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={() => { setEditingProduct(product); setView('form'); }}>Edit</button>
                                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', color: 'hsl(var(--accent))' }} onClick={() => handleDelete(product._id)}>Del</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
