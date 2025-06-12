import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/component/Login';
import Signup from './Auth/component/Signup';
import Dashboard from './landing_page/component/Dashboard';
import { isLoggedIn } from './auth';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
