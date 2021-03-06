import React, { useEffect } from "react";
import {
  MapDispatchToPropsParam,
  connect,
  MapStateToPropsParam
} from "react-redux";
import { DTC } from "../../../../../dtc";
import { QDispatchProp, AppState } from "../../../../redux/store";
import { fetchBands, joinBand, setBand } from "../../../../redux/actions";
import { useUser } from "../../../../context/user-context";

interface StateProps {
  bands: DTC.Band[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    bands: state.bands
  };
};

interface DispatchProps {
  dispatchFetchBands: (user: DTC.User) => void;
  dispatchSetBand: (band: DTC.Band) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchFetchBands: (user: DTC.User) => dispatch(fetchBands(user)),
    dispatchSetBand: (band: DTC.Band) => dispatch(setBand(band))
  };
};

function _JoinBand({
  dispatchFetchBands,
  dispatchSetBand,
  bands
}: DispatchProps & StateProps) {
  const user = useUser();

  useEffect(() => {
    dispatchFetchBands(user);
  }, [user, dispatchFetchBands]);

  return (
    <div className="container">
      <h1>My Bands</h1>
      <div className="list-group">
        {bands.map(band => {
          return (
            <a
              key={band.id}
              className="list-group-item list-group-item-action"
              onClick={() => dispatchSetBand(band)}
            >
              {band.name}
            </a>
          );
        })}
        {bands.length === 0 && "You better add some bands!"}
      </div>
    </div>
  );
}

export const MyBands = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_JoinBand);
