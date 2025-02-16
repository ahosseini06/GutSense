import styles from "../ChatSection/ChatSection.module.css";
const Error = () => (
  <div
    style={{
      diplay: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      textAlign: "center",
    }}
  >
    <h1>GutSense is currently down for maintenance :{"("}</h1>
    <p>We'll be back Feb 20th, 2025</p>
    <button
      onClick={() => (window.location.href = "/")}
      className={styles.sendButton}
    >
      Go to Home
    </button>
  </div>
);

export default Error;
