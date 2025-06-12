// src/Auth/component/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Fake login logic for now
        if (email === 'test@example.com' && password === '1234') {
            localStorage.setItem('token', 'test_token');
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <input
                    className="border p-2 w-full rounded"
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="border p-2 w-full rounded"
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
