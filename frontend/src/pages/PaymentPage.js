import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
    const { shippingAddress, savePaymentMethod } = useCart();
    const navigate = useNavigate();

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="container" style={{ padding: '3rem 0', maxWidth: '600px' }}>
            <h1 style={styles.title}>Payment Method</h1>
            <div style={styles.formCard} className="product-card">
                <form onSubmit={submitHandler}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Method</label>
                        <div style={styles.radioGroup}>
                            <div style={styles.radioOption}>
                                <input
                                    type="radio"
                                    id="PayPal"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={styles.radio}
                                />
                                <label htmlFor="PayPal" style={styles.radioLabel}>PayPal or Credit Card</label>
                            </div>
                            <div style={styles.radioOption}>
                                <input
                                    type="radio"
                                    id="Stripe"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={styles.radio}
                                />
                                <label htmlFor="Stripe" style={styles.radioLabel}>Stripe</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-hover" style={styles.button}>
                        Continue to Summary
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
        marginBottom: '2rem'
    },
    label: {
        display: 'block',
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--text-main)',
        marginBottom: '1.5rem'
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    radioOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        padding: '1rem',
        borderRadius: '10px',
        border: '1px solid var(--border-light)',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    radio: {
        width: '1.2rem',
        height: '1.2rem',
        cursor: 'pointer'
    },
    radioLabel: {
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer'
    },
    button: {
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
        marginTop: '1rem'
    }
};

export default PaymentPage;
