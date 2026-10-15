
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import { PinProvider } from "./PinContext";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Home from "./pages/Home";
import CreatePin from "./pages/CreatePin";
import Saved from "./pages/Saved";
import Liked from "./pages/Liked";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <PinProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <CreatePin />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Saved />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/liked"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Liked />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </PinProvider>
    </AuthProvider>
  );
}

export default App;
