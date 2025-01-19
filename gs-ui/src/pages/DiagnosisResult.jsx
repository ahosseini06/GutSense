// DiagnosisResult.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // The diagnosis data is passed via state from the DiagnosisForm component
  const diagnosis = location.state;

  // If there is no data in state, you might want to redirect back or show an error
  if (!diagnosis) {
    return (
      <div className="result-container">
        <h2>No diagnosis data found.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const {
    condition_category,
    confidence,
    follow_up,
    recommendations,
    risk_level,
    symptoms,
    triggers,
  } = diagnosis;

  return (
    <div className="result-container">
      <h1>Your Diagnosis Results</h1>
      <div className="result-card">
        <h2>Condition Category</h2>
        <p>{condition_category}</p>
      </div>
      <div className="result-card">
        <h2>Confidence</h2>
        <p>{(confidence * 100).toFixed(2)}%</p>
      </div>
      <div className="result-card">
        <h2>Risk Level</h2>
        <p>{risk_level}</p>
      </div>

      <div className="result-card">
        <h2>Symptoms</h2>
        <ul>
          {symptoms?.map((symptom, idx) => (
            <li key={idx}>{symptom}</li>
          ))}
        </ul>
      </div>

      <div className="result-card">
        <h2>Known Triggers</h2>
        <ul>
          {triggers?.map((trigger, idx) => (
            <li key={idx}>{trigger}</li>
          ))}
        </ul>
      </div>

      <div className="result-card">
        <h2>Follow-up Recommendations</h2>
        <ul>
          {follow_up?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="result-card">
        <h2>Lifestyle/Diet Recommendations</h2>
        <ul>
          {recommendations?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/")} className="home-button">
        Back to Questionnaire
      </button>
    </div>
  );
}

export default DiagnosisResult;
