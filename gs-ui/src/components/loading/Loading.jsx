import React from 'react';
import './loading.module.css';

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loading;
