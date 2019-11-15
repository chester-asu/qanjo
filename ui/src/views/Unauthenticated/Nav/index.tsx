import React from "react";
import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/register">
          Register
        </NavLink>
      </li>
    </ul>
  );
}
