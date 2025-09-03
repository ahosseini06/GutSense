import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiagnosisForm from "./pages/DiagnosisForm";
import DiagnosisResult from "./pages/DiagnosisResult";
import "./styles.css";
import Home from "./pages/Home";
import PastResults from "./pages/PastResults";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/form" element={<DiagnosisForm />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
          <Route path="/past-results" element={<PastResults />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
