import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import LoadingSpinner from './LoadingSpinner';

const SignUpCard = ({ onClose,openLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const signupSuccess = useSelector((state) => state.auth.signupSuccess)
  
  const isLoading = useSelector(state => state.auth.loading)
  useEffect(() => {
    const heading = document.querySelector('.card-bg');
    if (heading) {
      heading.classList.add('blur-animation');
    }
  }, [])

  useEffect(() => {
    if (signupSuccess) {
      openLogin();
    }
  }, [signupSuccess, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      setLocalError('Confirm Password should be equal to Password');
    } else {
      setLocalError('');
      dispatch(signup({ username, email, password }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-slate-400 bg-opacity-50 z-10 card-bg">
      <div className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96 card-bg">
      <button onClick={onClose} className="absolute top-5 right-7 text-right text-lg font-semibold hover:bg-white p-1 px-3 rounded-full transition-all">X</button>
        <h2 className="text-2xl font-semibold mb-6 mt-3 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md 
              ring-1 ring-slate-300
              hover:ring-1 hover:ring-blue-600
              focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md 
              ring-1 ring-slate-300
              hover:ring-1 hover:ring-blue-600
              focus:outline-none focus:ring-1 focus:ring-blue-600"
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
              hover:ring-1 hover:ring-blue-600
              rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border
              ring-1 ring-slate-300
              hover:ring-1 hover:ring-blue-600
               rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          {localError && <p className="text-red-500">{localError}</p>}
          {authError && <p className="text-red-500">{authError.message}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              {isLoading ? <LoadingSpinner/> : 'SignUp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
