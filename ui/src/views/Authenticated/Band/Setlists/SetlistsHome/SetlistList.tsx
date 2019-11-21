import React, { useEffect } from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { useHistory } from "react-router";

interface StateProps {
  setlists: DTC.Setlist[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    setlists: state.setlists
  };
};

interface DispatchProps {}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {};
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

function _SetlistList({ setlists }: Props) {
  const history = useHistory();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {setlists.map(setlist => {
            return (
              <tr
                key={setlist.id}
                onClick={() => history.push(`/setlists/${setlist.id}`)}
              >
                <td>{setlist.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export const SetlistList = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_SetlistList);
