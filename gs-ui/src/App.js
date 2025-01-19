import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiagnosisForm from "./DiagnosisForm";
import DiagnosisResult from "./DiagnosisResult";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<DiagnosisForm />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
