import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./Nav";
import { MyBands } from "./MyBands";
import { CreateBand } from "./CreateBand";

export function Join() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/create"} component={CreateBand}></Route>
        <Route path={["/", "/mybands"]} component={MyBands}></Route>
      </Switch>
    </Router>
  );
}
