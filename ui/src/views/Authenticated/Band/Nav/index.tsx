import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";
import { useBand } from "../../../../context/band-context";

export function Nav() {
  const { logout, switchBand } = useAuth();
  const band = useBand();
  return (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/home">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/songs">
          Songs
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/setlists">
          Setlists
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/gigs">
          Gigs
        </NavLink>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropbtn">
            Options
          </button>
          <div className="dropdown-content">
            <a href="#" onClick={switchBand}>
              Switch Band
            </a>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </li>
      <li className="right">
        <div className="band-name">{band.name}</div>
      </li>
    </ul>
  );
}
