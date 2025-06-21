import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../css/dashboard.css';
import DashImg from '../../assets/images/background.png';
import AvatarImg from '../../assets/images/prachanda.png';

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('Soldier');

    useEffect(() => {
        // Load user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData?.username) setUsername(userData.username);

        // Handle socket room join
        socket.on('joined-room', ({ roomId }) => {
            navigate(`/game/${roomId}`);
        });

        return () => {
            socket.off('joined-room');
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // clear user data
        navigate('/login');
    };

    const handleQuickPlay = () => {
        socket.emit('quick-play');
    };

    return (
        <div className="dashboard-container" style={{ backgroundImage: `url(${DashImg})` }}>
            <div className="dashboard-box glass-effect">
                <div className="avatar-container">
                    <img src={AvatarImg} alt="Avatar" className="avatar" />
                </div>

                <h1 className="glow-title">Lords Arena</h1>
                <p className="subtitle">Welcome, {username}!</p>

                <div className="stats-container">
                    <div className="stat-card">
                        <span>❤️ Health</span>
                        <strong>92%</strong>
                    </div>
                    <div className="stat-card">
                        <span>🛡️ Armor</span>
                        <strong>74%</strong>
                    </div>
                    <div className="stat-card">
                        <span>💰 Coins</span>
                        <strong>1430</strong>
                    </div>
                </div>

                <p className="subtitle">XP: 1340 / 1500</p>
                <div className="progress-bar">
                    <div className="progress" style={{ width: '89%' }}></div>
                </div>

                <div className="button-container">
                    <button className="neon-button" onClick={handleQuickPlay}>
                        🎮 Quick Play
                    </button>
                    <button className="neon-button logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
