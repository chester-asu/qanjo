import React, { useMemo, useState } from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { useParams } from "react-router";
import { Modal } from "../../../../../common/Modal";
import { EditSetlist } from "./EditSetlist";
import { CreateListing } from "./CreateListing";
import { deleteListing } from "../../../../../redux/actions";
interface StateProps {
  setlists: DTC.Setlist[];
  songs: DTC.Song[];
  listings: DTC.Listing[];
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    setlists: state.setlists,
    songs: state.songs,
    listings: state.listings
  };
};

interface DispatchProps {
  dispatchRemoveListing: (listing: DTC.Listing) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchRemoveListing: listing => dispatch(deleteListing(listing))
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

function _ManageSetlist({
  setlists,
  songs,
  listings,
  dispatchRemoveListing
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { setlistID } = useParams();

  const songsMap = useMemo<any>(() => {
    return songs.reduce((songsMap, song) => {
      return {
        ...songsMap,
        [song.id]: song
      };
    }, {});
  }, [songs]);

  const setlist = useMemo<DTC.Setlist>(() => {
    return setlists.find(
      setlist => String(setlist.id) == setlistID
    ) as DTC.Setlist;
  }, [setlistID, setlists]);
  
  const setlistSongs = useMemo<DTC.Song[]>(() => {
    return listings.map(
      listing => (songsMap[`${listing.song.id}`] as any) as DTC.Song
    ).filter(Boolean);
  }, [listings, songsMap]);

  if (!setlist) {
    return (
      <div className="container">
        <h1>No Setlist Found!</h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <h1>
            {setlist.title}
            <small style={{ fontSize: "0.5em", marginLeft: "8px" }}>
              (<a onClick={() => setShowEditModal(true)}>Edit</a>)
            </small>
            <button
              className="btn"
              style={{ float: "right" }}
              onClick={() => setShowCreateModal(true)}
            >
              Add Song
            </button>
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Key</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {setlistSongs.map((song, i) => {
                return (
                  <tr key={`${song.id}-${i}`}>
                    <td>{song.title}</td>
                    <td>{song.key}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() =>
                          dispatchRemoveListing(
                            listings.find(
                              listing => listing.song.id === song.id
                            ) as DTC.Listing
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal
          children={
            <EditSetlist
              onDone={() => setShowEditModal(false)}
              setlist={setlist}
            />
          }
          visible={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
        />
        <Modal
          children={
            <CreateListing
              onDone={() => setShowCreateModal(false)}
              setlist={setlist}
            />
          }
          visible={showCreateModal}
          onRequestClose={() => setShowCreateModal(false)}
        />
      </>
    );
  }
}

export const ManageSetlist = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_ManageSetlist);
