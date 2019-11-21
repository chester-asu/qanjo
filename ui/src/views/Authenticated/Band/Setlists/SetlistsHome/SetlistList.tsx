import React, { useState, useEffect } from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { Modal } from "../../../../../common/Modal";
import { EditSetlist } from "./EditSetlist";
import { fetchSetlists } from "../../../../../redux/actions";
import { useBand } from "../../../../../context/band-context";

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

interface DispatchProps {
  dispatchFetchSetlists: (band: DTC.Band) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchFetchSetlists: band => dispatch(fetchSetlists(band))
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

function _SetlistList({ setlists, dispatchFetchSetlists }: Props) {
  const band = useBand();

  useEffect(() => {
    dispatchFetchSetlists(band);
  }, [band, dispatchFetchSetlists]);

  const [selectedSetlist, setSelectedSetlist] = useState(
    (null as any) as DTC.Setlist
  );
  
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
              <tr key={setlist.id} onClick={() => setSelectedSetlist(setlist)}>
                <td>{setlist.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        children={
          <EditSetlist
            onDone={() => setSelectedSetlist((null as any) as DTC.Song)}
            setlist={selectedSetlist}
          />
        }
        visible={!!selectedSetlist}
        onRequestClose={() => setSelectedSetlist((null as any) as DTC.Song)}
      />
    </>
  );
}

export const SetlistList = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_SetlistList);
