import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [character, setCharacter] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user || 'Player');

    const selectedChar = JSON.parse(localStorage.getItem('selectedCharacter'));
    setCharacter(selectedChar);

    // Fetch leaderboard from backend
    fetch('http://localhost:5000/api/game/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error('Leaderboard fetch failed:', err));
  }, []);

  const handleQuickPlay = () => {
    navigate('/game');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>

      {character && (
        <div className="selected-character">
          <img
            src={require(`../../../assets/images/${character.avatar}`)}
            alt={character.name}
            className="character-avatar"
          />
          <p>{character.name}</p>
        </div>
      )}

      <button className="start-button" onClick={handleQuickPlay}>
        Start Quick Match
      </button>

      <div className="leaderboard-panel">
        <h2>🏆 Kill Count Leaderboard</h2>
        <ul>
          {leaderboard.length === 0 ? (
            <li>Loading...</li>
          ) : (
            leaderboard.map((player, index) => (
              <li key={index}>
                <span>{index + 1}. {player.username}</span>
                <span>{player.score} kills</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
