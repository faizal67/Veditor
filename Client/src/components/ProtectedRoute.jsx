import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../Home';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  if (!isAuthenticated && !loading) {
    return <Home />;
  }

  return children;
};

export default ProtectedRoute;
