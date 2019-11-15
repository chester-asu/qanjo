import React from "react";
import { DTC } from "../../dtc";
import { MapStateToPropsParam, DispatchProp, connect } from "react-redux";
import { AppState } from "../redux/store";

const BandContext = React.createContext({} as DTC.Band);

interface StateProps {
  band: DTC.Band;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    band: state.band
  };
};

export const useBand = () => React.useContext(BandContext);

function _BandProvider({ band, ...props }: StateProps & DispatchProp) {
  return <BandContext.Provider value={band} {...props} />;
}

export const BandProvider = connect<StateProps, DispatchProp, any, AppState>(
  mapStateToProps
)(_BandProvider);
