import React, { useState } from 'react';

const LoginCard = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-slate-400 bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-lg backdrop-blur-lg bg-opacity-70 shadow-2xl shadow-slate-600 w-96 glass-card">
        <button onClick={onClose} className="absolute top-5 right-7 text-right text-lg font-bold hover:bg-white px-1 rounded-md transition-all">X</button>
        <h2 className="text-2xl font-semibold mb-6 text-center mt-3">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border ring-1 ring-slate-300
              hover:ring-1 hover:ring-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border 
              ring-1 ring-slate-300
              hover:ring-1 hover:ring-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
