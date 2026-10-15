
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Pinterest</h1>
        <h2>Welcome back!</h2>
        <p>Log in to discover your inspiration.</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.loginButton} disabled={loading}>
            {loading ? "Please wait..." : "Log in"}
          </button>
        </form>

        <div style={styles.divider}>OR</div>

        <button
          type="button"
          style={styles.googleButton}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "white",
    padding: "35px",
    borderRadius: "20px",
    width: "340px",
    maxWidth: "85vw",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  title: {
    color: "#e60023",
    fontSize: "38px",
    marginBottom: "15px",
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    padding: "13px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "15px",
  },
  loginButton: {
    width: "100%",
    padding: "13px",
    marginTop: "10px",
    border: "none",
    borderRadius: "25px",
    background: "#e60023",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    background: "white",
    cursor: "pointer",
  },
  divider: {
    margin: "18px 0",
    fontSize: "12px",
    color: "#777",
  },
  footer: {
    marginTop: "22px",
    fontSize: "14px",
  },
  error: {
    color: "#c00",
    fontSize: "13px",
    overflowWrap: "anywhere",
  },
};

export default Login;
