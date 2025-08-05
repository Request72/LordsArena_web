import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  console.log('Dashboard component rendering');

  useEffect(() => {
    console.log('Dashboard useEffect - checking character');
    const storedChar = JSON.parse(localStorage.getItem('selectedCharacter'));
    console.log('Stored character:', storedChar);
    
    if (!storedChar) {
      console.log('No character found, navigating to character selection');
      navigate('/select-character');
    } else {
      console.log('Character found, setting character state');
      setCharacter(storedChar);
    }
  }, [navigate]);

  useEffect(() => {
    console.log('Dashboard useEffect - fetching leaderboard');
    // Set mock data immediately for testing
    setLeaderboard([
      { username: 'Demo Player 1', score: 150 },
      { username: 'Demo Player 2', score: 120 },
      { username: 'Demo Player 3', score: 90 }
    ]);
  }, []);

  const handleStartGame = () => {
    console.log('Start game button clicked');
    navigate('/game');
  };

  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  console.log('Dashboard render - character:', character, 'leaderboard:', leaderboard);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Lords Arena</h1>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>

      {character && (
        <div className="selected-character">
          <h2>Selected Hero: {character.name}</h2>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            backgroundColor: 'cyan', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem auto',
            fontSize: '12px',
            color: 'black'
          }}>
            {character.avatar}
          </div>
        </div>
      )}

      <button className="start-game-button" onClick={handleStartGame}>
        Start Game
      </button>

      <div className="leaderboard-section">
        <h2>🏆 Kill Count Leaderboard</h2>
        <ol>
          {leaderboard.map((player, index) => (
            <li key={index}>
              <strong>{player.username}</strong> — {player.score} kills
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;
