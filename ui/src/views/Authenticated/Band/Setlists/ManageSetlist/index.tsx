import React, { useMemo } from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { useParams } from "react-router";

interface StateProps {
  setlists: DTC.Setlist[];
  songs: DTC.Song[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    setlists: state.setlists,
    songs: state.songs
  };
};

interface DispatchProps {
  dispatchFunction: () => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchFunction: () => {}
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

function _ManageSetlist({ setlists, dispatch }: Props) {
  const { setlistID } = useParams();

  const setlist = useMemo<DTC.Setlist>(
    () =>
      setlists.find(setlist => String(setlist.id) == setlistID) as DTC.Setlist,
    [setlistID]
  );

  if (!setlist) {
    return (
      <div className="container">
        <h1>No Setlist Found!</h1>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>{setlist.title}</h1>
        <table></table>
      </div>
    );
  }
}

export const ManageSetlist = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_ManageSetlist);
