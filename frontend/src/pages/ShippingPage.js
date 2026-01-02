import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShippingPage = () => {
    const { shippingAddress, saveShippingAddress } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/payment');
    };

    return (
        <div className="container" style={{ padding: '3rem 0', maxWidth: '600px' }}>
            <h1 style={styles.title}>Shipping</h1>
            <div style={styles.formCard} className="product-card">
                <form onSubmit={submitHandler}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Address</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>City</label>
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Postal Code</label>
                        <input
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Country</label>
                        <input
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-hover" style={styles.button}>
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '2rem',
        color: 'var(--text-main)',
        textAlign: 'center'
    },
    formCard: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)'
    },
    formGroup: {
        marginBottom: '1.5rem'
    },
    label: {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--text-main)',
        marginBottom: '0.5rem'
    },
    input: {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '10px',
        border: '1px solid var(--border-light)',
        fontSize: '1rem',
        backgroundColor: '#f8fafc',
        transition: 'border-color 0.2s',
        outline: 'none'
    },
    button: {
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
        marginTop: '1rem'
    }
};

export default ShippingPage;
