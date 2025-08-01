import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const storedCharacter = localStorage.getItem('selectedCharacter');
    if (storedCharacter) {
      setSelectedCharacter(JSON.parse(storedCharacter));
    }
  }, []);

  const handleQuickPlay = () => {
    navigate('/game/main'); // ✅ Direct to Phaser game route
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {selectedCharacter?.avatar ? (
        <img
          src={`/assets/images/${selectedCharacter.avatar}`}
          alt="Avatar"
          className="avatar-img"
        />
      ) : (
        <div className="avatar-img">Avatar</div>
      )}

      <h1 className="glow-title">Lords Arena</h1>
      <p className="subtitle">Welcome, Soldier!</p>

      <div className="stats-container">
        <div className="stat-card">❤️ <strong>Health</strong> 92%</div>
        <div className="stat-card">🛡️ <strong>Armor</strong> 74%</div>
        <div className="stat-card">🪙 <strong>Coins</strong> 1430</div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: '89%' }}></div>
      </div>
      <div>XP: 1340 / 1500</div>

      <div className="button-container">
        <button className="neon-button" onClick={handleQuickPlay}>🎮 Quick Play</button>
        <button className="neon-button logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
