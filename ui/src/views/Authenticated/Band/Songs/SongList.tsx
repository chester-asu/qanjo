import React, { useEffect, useState } from "react";
import { DTC } from "../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../redux/store";
import { fetchSongs } from "../../../../redux/actions";
import { useBand } from "../../../../context/band-context";
import { Modal } from "../../../../common/Modal";
import { EditSong } from "./EditSong";

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

  const [selectedSong, setSelectedSong] = useState((null as any) as DTC.Song);

  useEffect(() => {
    dispatchFetchSongs(band);
  }, [band, dispatchFetchSongs]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          {songs.map(song => {
            return (
              <tr key={song.id} onClick={() => setSelectedSong(song)}>
                <td>{song.title}</td>
                <td>{song.key}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        children={
          <EditSong
            onDone={() => setSelectedSong((null as any) as DTC.Song)}
            song={selectedSong}
          />
        }
        visible={!!selectedSong}
        onRequestClose={() => setSelectedSong((null as any) as DTC.Song)}
      />
    </>
  );
}

export const SongList = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_SongList);
