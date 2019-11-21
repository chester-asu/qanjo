import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";
import { useBand } from "../../../../context/band-context";

export function Nav() {
  const { logout, switchBand } = useAuth();
  const band = useBand();
  return (
    // <ul className="nav">
    //   <li>
    //     <NavLink activeClassName="active" to="/home">
    //       {band.name}
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink activeClassName="active" to="/songs">
    //       Songs
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink activeClassName="active" to="/setlists">
    //       Setlists
    //     </NavLink>
    //   </li>
    //   <li>
    //     <div className="dropdown">
    //       <button className="dropbtn">Options</button>
    //       <div className="dropdown-content">
    //         <a href="#" onClick={switchBand}>
    //           Switch Band
    //         </a>
    //         <a href="#" onClick={logout}>
    //           Logout
    //         </a>
    //       </div>
    //     </div>
    //   </li>
    // </ul>
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
            <NavLink className="nav-link" activeClassName="active" to="/songs">
              Songs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/setlists"
            >
              Setlists
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
              <a className="dropdown-item" onClick={switchBand} href="#">
                Switch Band
              </a>
              <a className="dropdown-item" onClick={logout} href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="nav-link active">{band.name}</div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
