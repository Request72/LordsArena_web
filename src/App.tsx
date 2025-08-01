import React, { ReactElement } from 'react';
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
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn() ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-character"
          element={
            <ProtectedRoute>
              <CharacterSelection />
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
