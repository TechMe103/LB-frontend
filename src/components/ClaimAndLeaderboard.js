import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimAndLeaderboard = ({ selectedUserId }) => {
    const [rankings, setRankings] = useState([]);
    const [pointsClaimed, setPointsClaimed] = useState(null);
    const [loading, setLoading] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:5000/rankings');
                setRankings(response.data);
            } catch (err) {
                setError('Failed to load leaderboard.');
            }
            setLoading(false);
        };
        fetchRankings();
    }, [pointsClaimed]);

    const claimPoints = async () => {
        if (!selectedUserId) return;
        setClaiming(true);
        setError(null);
        try {
            const response = await axios.post(`http://localhost:5000/claim/${selectedUserId}`);
            setPointsClaimed(response.data.pointsClaimed);
        } catch (err) {
            setError('Failed to claim points.');
        }
        setClaiming(false);
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '40px auto',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            background: '#fff'
        }}>
            <h1 style={{ textAlign: 'center', color: '#1976d2' }}>Leaderboard</h1>
            <button
                onClick={claimPoints}
                disabled={!selectedUserId || claiming}
                style={{
                    width: '100%',
                    padding: '10px 0',
                    marginBottom: 16,
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 'bold',
                    fontSize: 16,
                    cursor: claiming ? 'not-allowed' : 'pointer',
                    opacity: !selectedUserId || claiming ? 0.6 : 1
                }}
            >
                {claiming ? 'Claiming...' : 'Claim Points'}
            </button>
            {pointsClaimed !== null && (
                <div style={{
                    background: '#e3fcef',
                    color: '#388e3c',
                    padding: '10px 0',
                    borderRadius: 6,
                    marginBottom: 16,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    You claimed {pointsClaimed} points!
                </div>
            )}
            {error && (
                <div style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '10px 0',
                    borderRadius: 6,
                    marginBottom: 16,
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
            {loading ? (
                <div style={{ textAlign: 'center', color: '#888' }}>Loading leaderboard...</div>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {rankings.map((user, index) => (
                        <li
                            key={user._id}
                            style={{
                                background: index === 0 ? '#fffde7' : '#f5f5f5',
                                marginBottom: 8,
                                padding: '10px 12px',
                                borderRadius: 6,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: index === 0 ? 'bold' : 'normal',
                                border: index === 0 ? '2px solid #ffd600' : '1px solid #e0e0e0'
                            }}
                        >
                            <span>
                                {index + 1}. {user.name}
                            </span>
                            <span style={{ color: '#1976d2', fontWeight: 'bold' }}>
                                {user.points} pts
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClaimAndLeaderboard;