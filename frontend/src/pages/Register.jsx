import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../firebase";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // --------------------------------
  // NORMAL REGISTER
  // --------------------------------
  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem(
      "pinterestUser",
      JSON.stringify(user)
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  // --------------------------------
  // GOOGLE LOGIN
  // --------------------------------
  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;

      console.log("Google login successful!");
      console.log("User:", user);

      const googleUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      localStorage.setItem(
        "pinterestGoogleUser",
        JSON.stringify(googleUser)
      );

      alert(`Welcome ${user.displayName}!`);

      navigate("/");

    } catch (error) {

      console.error(
        "=============================="
      );

      console.error(
        "GOOGLE LOGIN ERROR"
      );

      console.error(
        "Error code:",
        error.code
      );

      console.error(
        "Error message:",
        error.message
      );

      console.error(
        "Full error:",
        error
      );

      console.error(
        "=============================="
      );

      // Show the exact Firebase error on screen
      setError(
        `${error.code}: ${error.message}`
      );

    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* LOGO */}
        <div className="pinterest-logo">
          Pinterest
        </div>

        <h1>
          Create an account
        </h1>

        <p className="subtitle">
          Find new ideas and save what inspires you.
        </p>


        {/* NORMAL REGISTER FORM */}

        <form onSubmit={handleRegister}>

          <label>
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {/* ERROR MESSAGE */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>


        {/* DIVIDER */}

        <div className="divider">
          <span>OR</span>
        </div>


        {/* GOOGLE BUTTON */}

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogle}
          disabled={googleLoading}
        >

          <span className="google-letter">
            G
          </span>

          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}

        </button>


        {/* LOGIN LINK */}

        <p className="login-link">

          Already have an account?{" "}

          <Link to="/login">
            Log in
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;