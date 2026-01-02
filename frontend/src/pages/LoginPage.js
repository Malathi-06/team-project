import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login({ email, password });
            navigate(redirect);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: '700' }}>Welcome Back</h2>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'var(--primary)', fontWeight: '600' }}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
