import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import styles from "./styles/DiagnosisResult.module.css";

export default function PastResults() {
  const pastResults = localStorage.getItem("past-results")
    ? JSON.parse(localStorage.getItem("past-results"))
    : null;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "60%",
          }}
        >
          {pastResults &&
            pastResults[0] &&
            pastResults
              .filter((r) => r)
              .map((result, i) => (
                <button
                  onClick={() => navigate("/diagnosis", { state: result })}
                  key={i}
                  className={styles.resultCard}
                >
                  <h2>
                    {new Date(result.data?.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  <p>{result.data?.condition_category}</p>
                </button>
              ))}
          {!pastResults[0] && <h2>No past results found.</h2>}
        </div>
      </div>
    </>
  );
}
