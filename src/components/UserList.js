import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const UserList = ({ onUserSelect }) => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/users`);
                setUsers(response.data);
            } catch {
                setError('Failed to load users.');
            }
        };
        fetchUsers();
    }, []);

    const addUser = async () => {
        if (!newUserName.trim()) return;
        setAdding(true);
        setError(null);
        try {
            const response = await axios.post(`${BACKEND_URL}/users`, { name: newUserName });
            setUsers([...users, response.data]);
            setNewUserName('');
        } catch {
            setError('Failed to add user.');
        }
        setAdding(false);
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '24px auto',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            background: '#fff'
        }}>
            <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 18 }}>Select User</h2>
            <select
                onChange={(e) => onUserSelect(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px 8px',
                    borderRadius: 6,
                    border: '1px solid #bdbdbd',
                    marginBottom: 14,
                    fontSize: 16
                }}
                defaultValue=""
            >
                <option value="">Select a user</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Add new user"
                    style={{
                        flex: 1,
                        padding: '8px 10px',
                        borderRadius: 6,
                        border: '1px solid #bdbdbd',
                        fontSize: 15
                    }}
                    onKeyDown={e => { if (e.key === 'Enter') addUser(); }}
                    disabled={adding}
                />
                <button
                    onClick={addUser}
                    disabled={adding || !newUserName.trim()}
                    style={{
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 16px',
                        fontWeight: 'bold',
                        fontSize: 15,
                        cursor: adding || !newUserName.trim() ? 'not-allowed' : 'pointer',
                        opacity: adding || !newUserName.trim() ? 0.6 : 1
                    }}
                >
                    {adding ? 'Adding...' : 'Add User'}
                </button>
            </div>
            {error && (
                <div style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '8px 0',
                    borderRadius: 6,
                    textAlign: 'center',
                    marginBottom: 8
                }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default UserList;