// DiagnosisResult.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../components/error/Error";
import DashCard from "../components/dashCard/DashCard";
import styles from "./styles/DiagnosisResult.module.css";
import { GiStomach } from "react-icons/gi";
import Navbar from "../components/navbar/Navbar";

function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // The diagnosis data is passed via state from the DiagnosisForm component
  const result = location.state;
  const diagnosis = result ? result.data : null;
  console.log(result);
  console.log(diagnosis);
  const pastResults = localStorage.getItem("past-results")
    ? JSON.stringify(localStorage.getItem("past-results"))
    : null;

  if (result && result.error) {
    return <Error />;
  }

  if (!diagnosis) {
    return (
      <div className="result-container">
        <h2>No diagnosis data found.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
        {pastResults && pastResults[0] && (
          <button onClick={() => navigate("/past-results")}>
            View Past Results
          </button>
        )}
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
    date,
  } = diagnosis;

  /*return (
    <div className="result-container">
      <h1>Your Diagnosis Results</h1>
      <div className="result-card">
        <h2>Date</h2>
        <p>{date}</p>
      </div>
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
        Back to Home
      </button>
    </div>
  );*/
  return (
    <>
      <Navbar style={{ width: "100%" }} />
      <div className={styles.page}>
        <h1>Your Diagnosis Results</h1>

        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "150px",
              width: "100%",
              gap: "2rem",
            }}
          >
            <DashCard title="Your Gut Profile">
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  fontWeight: "800",
                  fontSize: "2.5rem",
                  width: "500",
                }}
              >
                {condition_category}
                <GiStomach />
              </div>
            </DashCard>

            <DashCard title="Severity">
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "2.5rem",
                }}
              >
                {risk_level}
              </div>
            </DashCard>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
              width: "100%",
              height: "200px",
            }}
          >
            <DashCard title="Your Triggers">
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "2.5rem",
                }}
              >
                <ul
                  style={{
                    marginTop: "5px",
                    marginBottom: "0px",
                    fontSize: "1.5rem",
                  }}
                >
                  {triggers?.map((trigger, idx) => (
                    <li key={idx}>{trigger}</li>
                  ))}
                </ul>
              </div>
            </DashCard>
            <DashCard title="Improvment Plan">
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "1.4rem",
                  width: "500px",
                }}
              >
                Gradual and small changes can make a big difference. Implement
                your recommendations slowly to see the best results.
              </div>
            </DashCard>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <DashCard title="Treatment">
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "1.4rem",
                }}
              >
                <ul
                  style={{
                    margin: "0px",
                    marginTop: "5px",
                    marginBottom: "0px",
                    fontSize: "1.5rem",
                  }}
                >
                  {recommendations?.map((trigger, idx) => (
                    <li key={idx}>{trigger}</li>
                  ))}
                </ul>
              </div>
            </DashCard>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <DashCard title="Follow-up Recommendations">
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "1.4rem",
                }}
              >
                <ul
                  style={{
                    margin: "0px",
                    marginTop: "5px",
                    marginBottom: "0px",
                    fontSize: "1.5rem",
                    width: "700px",
                  }}
                >
                  {follow_up?.map((trigger, idx) => (
                    <li key={idx}>{trigger}</li>
                  ))}
                </ul>
              </div>
            </DashCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiagnosisResult;
