import React from "react";
import { Home } from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./Nav";
import { JoinBand } from "./JoinBand";
import { CreateBand } from "./CreateBand";

export function Authenticated() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/createband"} component={CreateBand}></Route>
        <Route path={"/joinband"} component={JoinBand}></Route>
        <Route path={["/", "/home"]} component={Home}></Route>
      </Switch>
    </Router>
  );
}
