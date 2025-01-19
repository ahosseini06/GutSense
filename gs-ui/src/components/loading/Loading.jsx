import React from "react";
import "./loading.css";

const Loading = () => {
  /*return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );*/
  return (
    <div className="page">
      <div class="loader">
        <span class="loader-text">Analyzing your gut health</span>
        <span class="load"></span>
      </div>
    </div>
  );
};

export default Loading;
