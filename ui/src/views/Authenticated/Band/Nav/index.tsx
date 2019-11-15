import React from "react";
import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/setlists">
          Setlists
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/songs">
          Songs
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/gigs">
          Gigs
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/home">
          Home
        </NavLink>
      </li>
    </ul>
  );
}
