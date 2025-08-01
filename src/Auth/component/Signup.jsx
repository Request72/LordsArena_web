import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); // Optional: For Dashboard greeting
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form glass-effect" onSubmit={handleSignup}>
        <h2 className="glow-title">Create Your Account</h2>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
