import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Nav } from "./Nav";
import { Gigs } from "./Gigs";
import { Songs } from "./Songs";
import { Home } from "./Home";
import { Setlists } from "./Setlists";

export function Band() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/gigs"} component={Gigs}></Route>
        <Route path={"/setlists"} component={Setlists}></Route>
        <Route path={"/songs"} component={Songs}></Route>
        <Route path={"/home"} component={Home}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </Router>
  );
}
