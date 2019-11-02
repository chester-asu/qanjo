import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { Nav } from "./Nav";

export function Unauthenticated() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/register"} component={Register}></Route>
        <Route path={["/", "/login"]} component={Login}></Route>
      </Switch>
    </Router>
  );
}
