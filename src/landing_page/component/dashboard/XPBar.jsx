import React from 'react';

const XPBar = ({ progress }) => (
    <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
);

export default XPBar;
