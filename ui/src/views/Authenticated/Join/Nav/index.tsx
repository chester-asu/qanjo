import React from "react";
import { NavLink } from "react-router-dom";

export function Nav() {
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
    </ul>
  );
}
