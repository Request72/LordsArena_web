import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/component/Login';
import Signup from './Auth/component/Signup';
import Dashboard from './landing_page/component/Dashboard';
import { isLoggedIn } from './auth';
import './App.css';

// ✅ Type-safe ProtectedRoute
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
        {/* 🔁 Default redirect */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn() ? '/dashboard' : '/login'} replace />}
        />

        {/* 🔓 Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
