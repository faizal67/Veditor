import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button className='fixed top-10 right-12
                  border-2
                  border-blue-700
                  p-2   
                  text-sm
                  font-semibold
                  rounded-md 
                  text-blue-700
                  transition-all
                  shadow-xl
                  bg-blue-50
                  hover:text-blue-700
                  hover:shadow-slate-400'
                  cursor-pointer
                  onClick={handleLogout}>Logout</button>
  );
};

export default Logout;