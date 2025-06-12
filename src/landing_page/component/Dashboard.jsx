import React from 'react';
import '../css/dashboard.css';
import DashImg from "../../assets/images/background.jpg"; // fixed import
import AvatarImg from "../../assets/images/lordsarena.png";

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div
            className="dashboard-container"
            style={{ backgroundImage: `url(${DashImg})` }}
        >
            <div className="dashboard-box glass-effect">
                <img src={AvatarImg} alt="Avatar" className="avatar" /> {/* ✅ Use the variable here */}
                <h1 className="glow-title">Lords Arena</h1>
                <p className="subtitle">Welcome, Soldier!</p>

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

                <button className="neon-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
