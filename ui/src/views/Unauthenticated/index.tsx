import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { Nav } from "./Nav";

export function Unauthenticated() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/register"} component={Register}></Route>
        <Route path={"/login"} component={Login}></Route>
        <Redirect to="/login"></Redirect>
      </Switch>
    </Router>
  );
}
