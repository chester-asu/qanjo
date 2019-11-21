import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";

export function Nav() {
  const { logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Qanjo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/mybands">
              Join Band
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/create">
              Create Band
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Options
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" onClick={logout} href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
