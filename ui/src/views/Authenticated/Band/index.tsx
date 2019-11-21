import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Nav } from "./Nav";
import { Songs } from "./Songs";
import { Home } from "./Home";
import { Setlists } from "./Setlists";
import { useBand } from "../../../context/band-context";
import {
  MapStateToPropsParam,
  MapDispatchToPropsParam,
  connect
} from "react-redux";
import { AppState, QDispatchProp } from "../../../redux/store";
import { DTC } from "../../../../dtc";
import {
  fetchSetlists,
  fetchSongs,
  fetchListings
} from "../../../redux/actions";

interface StateProps {}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {};
};

interface DispatchProps {
  dispatchFetchSongs: (band: DTC.Band) => void;
  dispatchFetchSetlists: (band: DTC.Band) => void;
  dispatchFetchListings: (band: DTC.Band) => void;
  dispatchFetchGigs: (band: DTC.Band) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchFetchSetlists: band => dispatch(fetchSetlists(band)),
    dispatchFetchSongs: band => dispatch(fetchSongs(band)),
    dispatchFetchListings: band => dispatch(fetchListings(band)),
    dispatchFetchGigs: band => {}
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

export function _Band({
  dispatchFetchGigs,
  dispatchFetchSetlists,
  dispatchFetchSongs,
  dispatchFetchListings
}: Props) {
  const band = useBand();

  useEffect(() => {
    dispatchFetchGigs(band);
    dispatchFetchSetlists(band);
    dispatchFetchSongs(band);
    dispatchFetchListings(band);
  }, [band]);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={"/setlists"} component={Setlists}></Route>
        <Route path={"/songs"} component={Songs}></Route>
        <Route path={"/home"} component={Home}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </Router>
  );
}

export const Band = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_Band);
