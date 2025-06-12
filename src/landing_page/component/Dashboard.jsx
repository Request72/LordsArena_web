import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h1>Welcome to Lords Arena Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
