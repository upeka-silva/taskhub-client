import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../api/contextApi";
import navBarLogo from "../assets/task-actions.png";
import "../style/NavBar.css";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { token, setToken } = useStoreContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("USER_EMAIL");
    localStorage.removeItem("JWT_TOKEN");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-logo">
          Task-Hub
          <div className="navbar-logo-img">
            <img src={navBarLogo} alt="Task-Hub Logo" />
          </div>
        </Link>

        <ul className={`navbar-links ${navbarOpen ? "open" : ""}`}>
          {!token && (
            <li>
              <Link to="/registration" className="navbar-button">
                SignUp
              </Link>
            </li>
          )}
          {token && (
            <li>
              <button onClick={handleLogout} className="navbar-button">
                LogOut
              </button>
            </li>
          )}
        </ul>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="navbar-toggle"
        ></button>
      </div>
    </div>
  );
};

export default Navbar;
