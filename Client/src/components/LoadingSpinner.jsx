import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid skyblue', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
      );
};

export default LoadingSpinner;
