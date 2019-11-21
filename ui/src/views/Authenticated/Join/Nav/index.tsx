import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";

export function Nav() {
  const { logout } = useAuth();
  return (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/join">
          Join Band
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/create">
          Create Band
        </NavLink>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropbtn">Options</button>
          <div className="dropdown-content">
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </li>
    </ul>
  );
}
