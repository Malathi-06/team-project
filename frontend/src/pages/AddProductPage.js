import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        image: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories', err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await productService.createProduct(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '3rem auto' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem', fontWeight: '700' }}>Add New Product</h2>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-input"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price ($)</label>
                            <input
                                type="number"
                                className="form-input"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Stock Quantity</label>
                            <input
                                type="number"
                                className="form-input"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-input"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="4"
                            style={{ resize: 'vertical' }}
                            required
                        ></textarea>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                        <button type="button" className="btn" style={{ flex: 1, border: '1px solid var(--border-light)' }} onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
