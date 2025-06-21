import React from 'react';

const StatDisplay = ({ label, value }) => (
    <div className="stat-card">
        <span>{label}</span>
        <strong>{value}</strong>
    </div>
);

export default StatDisplay;
