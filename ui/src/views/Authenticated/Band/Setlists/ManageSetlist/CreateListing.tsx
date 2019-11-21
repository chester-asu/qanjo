import React, { useCallback } from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { createListing } from "../../../../../redux/actions";

interface OwnProps {
  setlist: DTC.Setlist;
  onDone: () => void;
}

interface StateProps {
  songs: DTC.Song[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = function(state) {
  return {
    songs: state.songs
  };
};

interface DispatchProps {
  dispatchCreateListing: (values: DTC.CreateListing) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = function(dispatch: QDispatchProp) {
  return {
    dispatchCreateListing: values => dispatch(createListing(values))
  };
};

type Props = OwnProps &
  StateProps &
  DispatchProps & { dispatch?: QDispatchProp };

function _CreateListing({
  songs,
  dispatchCreateListing,
  setlist,
  onDone
}: Props) {
  return (
    <div>
      <h1>Choose a Song</h1>
      <div className="list-group">
        {songs.map(song => {
          return (
            <a
              key={song.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                dispatchCreateListing({
                  setlistID: setlist.id,
                  songID: song.id
                });
                onDone();
              }}
            >
              {song.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export const CreateListing = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(_CreateListing);
