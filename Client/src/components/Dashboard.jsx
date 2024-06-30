import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.name}</p>}
    </div>
  );
};

export default Dashboard;
