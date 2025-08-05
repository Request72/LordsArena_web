import React, { ReactElement, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/component/Login';
import Signup from './Auth/component/Signup';
import Dashboard from './landing_page/component/dashboard/Dashboard';
import GameRoom from './landing_page/component/game/GameRoom';
import CharacterSelection from './landing_page/component/CharacterSelection';
import { isLoggedIn } from './auth';
import './App.css';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
  const isUserLoggedIn = isLoggedIn();
  const character = localStorage.getItem('selectedCharacter');
  
  console.log('ProtectedRoute check:', { isUserLoggedIn, character });
  
  if (!isUserLoggedIn) {
    console.log('User not logged in, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  if (!character) {
    console.log('No character selected, redirecting to character selection');
    return <Navigate to="/select-character" replace />;
  }
  console.log('User authenticated and character selected, rendering protected content');
  return children;
};

const App: React.FC = () => {
  const userLoggedIn = isLoggedIn();
  console.log('App render - isLoggedIn:', userLoggedIn);
  
  // For testing - set up test data if not exists
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      console.log('Setting up test data...');
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('username', 'test-user');
    }
    if (!localStorage.getItem('selectedCharacter')) {
      console.log('Setting up test character...');
      localStorage.setItem('selectedCharacter', JSON.stringify({
        name: 'Sher Bahadur',
        avatar: 'sher.png',
        health: 90,
        armor: 60
      }));
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={userLoggedIn ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select-character" element={<CharacterSelection />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GameRoom />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
