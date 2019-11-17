import React, { useEffect } from "react";
import { DTC } from "../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../redux/store";
import { fetchSongs } from "../../../../redux/actions";
import { useBand } from "../../../../context/band-context";

interface StateProps {
  songs: DTC.Song[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    songs: state.songs
  };
};

interface DispatchProps {
  dispatchDeleteSong: (song: DTC.Song) => void;
  dispatchFetchSongs: (band: DTC.Band) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchDeleteSong: song => {},
    dispatchFetchSongs: band => dispatch(fetchSongs(band))
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

function _SongList({ songs, dispatchFetchSongs }: Props) {
  const band = useBand();

  useEffect(() => {
    dispatchFetchSongs(band);
  }, [band, dispatchFetchSongs]);

  return (
    <div>
      <ul>
        {songs.map(song => {
          return (
            <li key={song.id}>
              {[song.title, song.key].filter(Boolean).join(", ")}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const SongList = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_SongList);
