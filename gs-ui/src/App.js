import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiagnosisForm from "./pages/DiagnosisForm";
import DiagnosisResult from "./pages/DiagnosisResult";
import "./styles.css";
import Home from "./pages/Home";
import PastResults from "./pages/PastResults";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/form" element={<DiagnosisForm />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
          <Route path="/past-results" element={<PastResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
