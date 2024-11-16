import { useState, useEffect, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import App from "./components/App";
import About from "./components/About";
import NavBar from "./components/NavBar";
import "./index.css";
import "./components/NavBar.css";

function Main() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "false" ? false : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("light-mode", darkMode);
  });
  return (
    <>
      {/* <NavBar darkMode={darkMode} setDarkMode={setDarkMode} /> */}
      <Routes>
        <Route path="/" element={<App darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Main />
      {/* <App /> */}
    </Router>
  </StrictMode>
);
