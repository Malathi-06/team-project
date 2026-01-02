import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.deleteUser(id);
                fetchUsers();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading users...</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={styles.title}>User Management</h1>
            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.tableCard} className="product-card">
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>NAME</th>
                            <th style={styles.th}>EMAIL</th>
                            <th style={styles.th}>ROLE</th>
                            <th style={styles.th}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} style={styles.row}>
                                <td style={styles.td}>{user._id.substring(0, 8)}...</td>
                                <td style={styles.td}>{user.name}</td>
                                <td style={styles.td}>
                                    <a href={`mailto:${user.email}`} style={styles.emailLink}>{user.email}</a>
                                </td>
                                <td style={styles.td}>
                                    <span style={user.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                            style={styles.deleteBtn}
                                        >
                                            🗑
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
    },
    tableCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    headerRow: {
        borderBottom: '2px solid var(--border-light)',
    },
    th: {
        padding: '1.2rem',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-muted)',
        fontWeight: '700',
    },
    row: {
        borderBottom: '1px solid var(--border-light)',
        transition: 'background 0.2s',
    },
    td: {
        padding: '1.2rem',
        fontSize: '0.95rem',
        color: 'var(--text-main)',
    },
    emailLink: {
        color: 'var(--primary)',
        textDecoration: 'none',
    },
    badgeAdmin: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    badgeUser: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#ef4444',
        transition: 'transform 0.2s',
    }
};

export default UserListPage;
