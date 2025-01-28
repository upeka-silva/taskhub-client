import React, { useState } from "react";
import { Link } from "react-router-dom";
import navBarLogo from "../assets/task-actions.png";

import "../style/NavBar.css";

const Navbar = ({ path, token, onLogOutHandler }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          Task-Hub
          <div className="navbar-logo-img">
            <img src={navBarLogo} />
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
            <button onClick={onLogOutHandler} className="navbar-button">
              LogOut
            </button>
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
