import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App";
import "./index.css"; // Optional, include if you have global styles

// Get the root element from the HTML
const rootElement = document.getElementById("root");

// Use ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
