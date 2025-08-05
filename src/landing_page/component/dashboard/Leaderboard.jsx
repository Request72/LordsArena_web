import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/leaderboard')
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(err => console.error('Leaderboard fetch error:', err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Kill Count Leaderboard</h2>
      <ul className="leaderboard-list">
        {scores.map((entry, index) => (
          <li key={index}>
            <strong>{entry.username}</strong>: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
