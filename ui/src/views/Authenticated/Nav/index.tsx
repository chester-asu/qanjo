import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <ul>
      <li>
        <Link to="/joinband">Join Band</Link>
      </li>
      <li>
        <Link to="/createband">Create Band</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
    </ul>
  );
}
