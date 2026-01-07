import { useState, useEffect } from 'react';

export default function ProductForm({ existingProduct, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        category: '',
        stock: '',
        images: '',
        attributes: []
    });
    const [categories, setCategories] = useState([]);
    const [attrKey, setAttrKey] = useState('');
    const [attrValue, setAttrValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));

        if (existingProduct) {
            setFormData({
                ...existingProduct,
                images: existingProduct.images.join(', '),
                category: existingProduct.category._id || existingProduct.category
            });
        }
    }, [existingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAttribute = () => {
        if (attrKey && attrValue) {
            setFormData(prev => ({
                ...prev,
                attributes: [...prev.attributes, { key: attrKey, value: attrValue }]
            }));
            setAttrKey('');
            setAttrValue('');
        }
    };

    const removeAttribute = (index) => {
        setFormData(prev => ({
            ...prev,
            attributes: prev.attributes.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            images: formData.images.split(',').map(url => url.trim()).filter(Boolean)
        };
        onSave(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{existingProduct ? 'Edit Product' : 'New Product'}</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label>Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Price ($)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>SKU</label>
                    <input name="sku" value={formData.sku} onChange={handleChange} required />
                </div>

                <div>
                    <label>Image URLs (comma separated)</label>
                    <input name="images" value={formData.images} onChange={handleChange} placeholder="https://..." />
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <h4>Custom Attributes</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input placeholder="Trait (e.g. Color)" value={attrKey} onChange={e => setAttrKey(e.target.value)} />
                        <input placeholder="Value (e.g. Red)" value={attrValue} onChange={e => setAttrValue(e.target.value)} />
                        <button type="button" className="btn btn-secondary" onClick={handleAddAttribute}>Add</button>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {formData.attributes.map((attr, idx) => (
                            <li key={idx} style={{ background: 'hsla(var(--primary), 0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {attr.key}: {attr.value} <span onClick={() => removeAttribute(idx)} style={{ cursor: 'pointer', marginLeft: '0.5rem' }}>&times;</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
            </div>
        </form>
    );
}
