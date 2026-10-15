import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Check whether the user is logged in
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // Logout function
  const handleLogout = () => {
    localStorage.setItem(
      "isLoggedIn",
      "false"
    );

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="navbar-logo"
      >
        Pinterest
      </Link>


      {/* =========================
          NAVIGATION LINKS
      ========================= */}

      <div className="navbar-links">

        {/* Home */}
        <Link to="/">
          Home
        </Link>


        {/* Create */}
        <Link to="/create">
          Create
        </Link>


        {/* Saved */}
        <Link to="/saved">
          Saved
        </Link>


        {/* Liked */}
        <Link to="/liked">
          ❤️ Liked
        </Link>


        {/* =====================
            LOGGED IN
        ===================== */}

        {isLoggedIn ? (
          <>
            {/* Profile */}
            <Link to="/profile">
              Profile
            </Link>

            {/* Logout */}
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (

          /* =====================
             LOGGED OUT
          ===================== */

          <>
            {/* Login */}
            <Link to="/login">
              Login
            </Link>

            {/* Register */}
            <Link to="/register">
              Register
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;