// DiagnosisResult.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../components/error/Error";
import DashCard from "../components/dashCard/DashCard";
import styles from "./styles/DiagnosisResult.module.css";
import { GiStomach } from "react-icons/gi";
import Navbar from "../components/navbar/Navbar";
import { motion } from "framer-motion";
import ChatSection from "../components/ChatSection/ChatSection";

function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showComponents, setShowComponents] = React.useState(false);
  const handleShowComponents = () => setShowComponents(true);

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
      <>
        <Navbar style={{ width: "100%" }} />
        <div className={styles.page}>
          {pastResults && pastResults[0] ? (
            <button
              className={styles.viewBtn}
              onClick={() => navigate("/past-results")}
            >
              View Past Results
            </button>
          ) : (
            <>
              <h2>No past results found.</h2>
              <button
                className={styles.viewBtn}
                onClick={() => navigate("/form")}
              >
                Take a Diagnostic Test
              </button>
            </>
          )}
        </div>
      </>
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

  return (
    <>
      <Navbar style={{ width: "100%" }} />
      <div className={styles.page}>
        <div className={styles.container}>
          <motion.div
            initial={false}
            animate={showComponents ? { y: 0 } : { y: 10 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
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
            </div>{" "}
          </motion.div>

          {!showComponents && (
            <button className={styles.viewBtn} onClick={handleShowComponents}>
              {" "}
              view details
            </button>
          )}
          {showComponents && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            >
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
                      {triggers
                        ? triggers.map((trigger, idx) => (
                            <li key={idx}>{trigger}</li>
                          ))
                        : "None"}
                    </ul>
                  </div>
                </DashCard>
                <DashCard title="Improvement Plan">
                  <div
                    style={{
                      fontWeight: "400",
                      fontSize: "1.4rem",
                      width: "360px",
                    }}
                  >
                    Gradual and small changes can make a big difference.
                    Implement your recommendations slowly to see the best
                    results.
                  </div>
                </DashCard>
              </div>
            </motion.div>
          )}
          {showComponents && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              style={styles.component}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <DashCard title="Treatment" lg={true}>
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
            </motion.div>
          )}
          {showComponents && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              style={styles.component}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <DashCard title="Follow-up Recommendations" lg={true}>
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
            </motion.div>
          )}
          {showComponents && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%" }}
            >
              <ChatSection
                title="Have more questions about your results?"
                diagnosis={diagnosis}
              ></ChatSection>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default DiagnosisResult;
