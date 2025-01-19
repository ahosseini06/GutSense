import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiagnosisForm from "./pages/DiagnosisForm";
import DiagnosisResult from "./pages/DiagnosisResult";
import "./styles.css";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/form" element={<DiagnosisForm />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
