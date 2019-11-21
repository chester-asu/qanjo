import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { SetlistsHome } from "./SetlistsHome";
import { ManageSetlist } from "./ManageSetlist";

export function Setlists() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/setlists"} component={SetlistsHome}></Route>
        <Route path={"/setlists/:setlistID"} component={ManageSetlist}></Route>
      </Switch>
    </Router>
  );
}
