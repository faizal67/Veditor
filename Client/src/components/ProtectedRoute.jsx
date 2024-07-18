import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const [wait, setWait] = useState(true);
  setTimeout(()=>{
    setWait(false)
  },5000)

  useEffect(() => {
    if (!isAuthenticated && !loading  && !wait) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate, wait]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated && wait){
    return <div className="text-3xl text-red-500 flex items-center justify-center h-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg flex items-center">
      <span role="img" aria-label="warning" className="text-4xl mr-4">⚠️</span>
      <p>You are not authorized...</p>
    </div>
  </div>
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

