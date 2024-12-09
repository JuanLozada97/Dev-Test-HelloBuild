import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";

// Check if a user token exists in LocalStorage
const isAuthenticated = () => {
  return !!localStorage.getItem("CLIENT_ID");
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to Sign Up if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signup" />;
};

export default App;
