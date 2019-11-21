import React from "react";
import { useUser } from "../../../../context/user-context";
import { useBand } from "../../../../context/band-context";
import { Link } from "react-router-dom";

export function Home() {
  const user = useUser();
  const band = useBand();
  return (
    <div className="container">
      <h1>{`Welcome, ${user.username}.`}</h1>
      <h3
        style={{ marginTop: 4, fontSize: `1.5em` }}
      >{`You are currently in the band ${band.name}`}</h3>
      <br />
      <div>
        In order to add songs to your band's repertoire, navigate to the{" "}
        <Link to="/songs">Songs</Link> tab.
      </div>
      <br />
      <div>
        In order to add setlists, navigate to the{" "}
        <Link to="/setlists">Setlists</Link> tab.
      </div>
    </div>
  );
}
