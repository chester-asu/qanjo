import { DTC } from "../../dtc";
import { Dispatch, Action } from "redux";
import { unauthenticatedClient, authenticatedClient } from "../util/client";

export type LoginAction = Action<ActionType> & DTC.Token & { error: string};
export type RegisterAction = Action<ActionType> & DTC.Token;
export type CreateBandAction = Action<ActionType> & { band: DTC.Band };
export type FetchBandsAction = Action<ActionType> & { bands: DTC.Band[] };
export type CreateMembershipAction = Action<ActionType> & {
  membership: DTC.Membership;
};
export type SetBandAction = Action<ActionType> & { band: DTC.Band };
export type CreateSongAction = Action<ActionType> & { song: DTC.Song };
export type FetchSongsAction = Action<ActionType> & { songs: DTC.Song[] };
export type DeleteSongAction = Action<ActionType> & { song: DTC.Song };

export type FetchSetlistsAction = Action<ActionType> & {
  setlists: DTC.Setlist[];
};
export type CreateSetlistAction = Action<ActionType> & { setlist: DTC.Setlist };


export type CreateListingAction = Action<ActionType> & { listing: DTC.Listing };
export type FetchListingsAction = Action<ActionType> & { listings: DTC.Listing[] };
export type DeleteListingAction = Action<ActionType> & { listing: DTC.Listing };

export enum ActionType {
  LOGOUT = "LOGOUT",
  CLEAR_ERRORS = "CLEAR_ERRORS",

  SET_BAND = "SET_BAND",
  UNSET_BAND = "UNSET_BAND",

  LOGIN_SUBMIT = "LOGIN_SUBMIT",
  LOGIN_COMMIT = "LOGIN_COMMIT",
  LOGIN_ROLLBACK = "LOGIN_ROLLBACK",

  REGISTER_SUBMIT = "REGISTER_SUBMIT",
  REGISTER_COMMIT = "REGISTER_COMMIT",
  REGISTER_ROLLBACK = "REGISTER_ROLLBACK",

  CREATE_BAND_SUBMIT = "CREATE_BAND_SUBMIT",
  CREATE_BAND_COMMIT = "CREATE_BAND_COMMIT",
  CREATE_BAND_ROLLBACK = "CREATE_BAND_ROLLBACK",

  CREATE_MEMBERSHIP_SUBMIT = "CREATE_MEMBERSHIP_SUBMIT",
  CREATE_MEMBERSHIP_COMMIT = "CREATE_MEMBERSHIP_COMMIT",
  CREATE_MEMBERSHIP_ROLLBACK = "CREATE_MEMBERSHIP_ROLLBACK",

  FETCH_BANDS_SUBMIT = "FETCH_BANDS_SUBMIT",
  FETCH_BANDS_COMMIT = "FETCH_BANDS_COMMIT",
  FETCH_BANDS_ROLLBACK = "FETCH_BANDS_ROLLBACK",

  FETCH_SETLISTS_SUBMIT = "FETCH_SETLISTS_SUBMIT",
  FETCH_SETLISTS_COMMIT = "FETCH_SETLISTS_COMMIT",
  FETCH_SETLISTS_ROLLBACK = "FETCH_SETLISTS_ROLLBACK",

  CREATE_SETLIST_SUBMIT = "CREATE_SETLIST_SUBMIT",
  CREATE_SETLIST_COMMIT = "CREATE_SETLIST_COMMIT",
  CREATE_SETLIST_ROLLBACK = "CREATE_SETLIST_ROLLBACK",

  EDIT_SETLIST_SUBMIT = "EDIT_SETLIST_SUBMIT",
  EDIT_SETLIST_COMMIT = "EDIT_SETLIST_COMMIT",
  EDIT_SETLIST_ROLLBACK = "EDIT_SSETLIST_ROLLBACK",

  DELETE_SETLIST_SUBMIT = "DELETE_SETLIST_SUBMIT",
  DELETE_SETLIST_COMMIT = "DELETE_SETLIST_COMMIT",
  DELETE_SETLIST_ROLLBACK = "DELETE_SETLIST_ROLLBACK",

  CREATE_LISTING_SUBMIT = "CREATE_LISTING_SUBMIT",
  CREATE_LISTING_COMMIT = "CREATE_LISTING_COMMIT",
  CREATE_LISTING_ROLLBACK = "CREATE_LISTING_ROLLBACK",

  DELETE_LISTING_SUBMIT = "DELETE_LISTINGT_SUBMIT",
  DELETE_LISTING_COMMIT = "DELETE_LISTING_COMMIT",
  DELETE_LISTING_ROLLBACK = "DELETE_LISTING_ROLLBACK",

  FETCH_LISTINGS_SUBMIT = "FETCH_LISTINGS_SUBMIT",
  FETCH_LISTINGS_COMMIT = "FETCH_LISTINGS_COMMIT",
  FETCH_LISTINGS_ROLLBACK = "FETCH_LISTINGS_ROLLBACK",

  CREATE_SONG_SUBMIT = "CREATE_SONG_SUBMIT",
  CREATE_SONG_COMMIT = "CREATE_SONG_COMMIT",
  CREATE_SONG_ROLLBACK = "CREATE_SONG_ROLLBACK",

  EDIT_SONG_SUBMIT = "EDIT_SONG_SUBMIT",
  EDIT_SONG_COMMIT = "EDIT_SONG_COMMIT",
  EDIT_SONG_ROLLBACK = "EDIT_SONG_ROLLBACK",

  DELETE_SONG_SUBMIT = "DELETE_SONG_SUBMIT",
  DELETE_SONG_COMMIT = "DELETE_SONG_COMMIT",
  DELETE_SONG_ROLLBACK = "DELETE_SONG_ROLLBACK",

  FETCH_SONGS_SUBMIT = "FETCH_SONGS_SUBMIT",
  FETCH_SONGS_COMMIT = "FETCH_SONGS_COMMIT",
  FETCH_SONGS_ROLLBACK = "FETCH_SONGS_ROLLBACK"
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("band");
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.LOGOUT
    });
  };
}

export function loginUser(login: DTC.Login) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.LOGIN_SUBMIT
    });
    unauthenticatedClient
      .post("/auth/login", login)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch({
          type: ActionType.LOGIN_COMMIT,
          token
        });
      })
      .catch(error => {
        dispatch({
          error,
          type: ActionType.LOGIN_ROLLBACK
        });
      });
  };
}

export function registerUser(register: DTC.Register) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.REGISTER_SUBMIT
    });
    unauthenticatedClient
      .post("/auth/register", register)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch({
          type: ActionType.REGISTER_COMMIT,
          token
        });
      })
      .catch(error => {
        dispatch({
          error,
          type: ActionType.REGISTER_ROLLBACK
        });
      });
  };
}

export function fetchBands(user: DTC.User) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.FETCH_BANDS_SUBMIT
    });
    authenticatedClient
      .get(`/band/user/${user.id}`)
      .then(res => {
        dispatch({
          type: ActionType.FETCH_BANDS_COMMIT,
          bands: res.data as DTC.Band[]
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.FETCH_BANDS_ROLLBACK
        });
      });
  };
}

export function startBand(createBand: DTC.CreateBand) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.CREATE_BAND_SUBMIT
    });
    authenticatedClient
      .post("/band", createBand)
      .then(res => {
        dispatch({
          type: ActionType.CREATE_BAND_COMMIT,
          band: res.data as DTC.Band
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.CREATE_BAND_ROLLBACK
        });
      });
  };
}

export function joinBand(createMembership: DTC.CreateMembership) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.CREATE_MEMBERSHIP_SUBMIT
    });
    authenticatedClient
      .post("/membership", createMembership)
      .then(res => {
        dispatch({
          type: ActionType.CREATE_MEMBERSHIP_COMMIT,
          membership: res.data as DTC.Membership
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.CREATE_MEMBERSHIP_ROLLBACK
        });
      });
  };
}

export function setBand(band: DTC.Band) {
  return (dispatch: Dispatch) => {
    localStorage.setItem("band", JSON.stringify(band));
    dispatch({
      band,
      type: ActionType.SET_BAND
    });
  };
}

export function unsetBand() {
  return (dispatch: Dispatch) => {
    localStorage.removeItem("band");
    dispatch({
      type: ActionType.UNSET_BAND
    });
  };
}

export function createSetlist(createSetlist: DTC.CreateSetlist) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.CREATE_SETLIST_SUBMIT
    });
    authenticatedClient
      .post("/setlist", createSetlist)
      .then(res => {
        dispatch({
          type: ActionType.CREATE_SETLIST_COMMIT,
          setlist: res.data as DTC.Setlist
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.CREATE_SETLIST_ROLLBACK
        });
      });
  };
}

export function editSetlist(editSetlist: DTC.EditSetlist) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.EDIT_SETLIST_SUBMIT
    });
    authenticatedClient
      .patch("/setlist", editSetlist)
      .then(res => {
        dispatch({
          type: ActionType.EDIT_SETLIST_COMMIT,
          setlist: res.data as DTC.Setlist
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.EDIT_SETLIST_ROLLBACK
        });
      });
  };
}

export function deleteSetlist(setlist: DTC.Setlist) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_SETLIST_SUBMIT
    });
    authenticatedClient
      .delete(`/setlist/${setlist.id}`)
      .then(res => {
        dispatch({
          type: ActionType.DELETE_SETLIST_COMMIT,
          setlist
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.DELETE_SETLIST_ROLLBACK,
          setlist
        });
      });
  };
}

export function fetchSetlists(band: DTC.Band) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.FETCH_SETLISTS_SUBMIT
    });

    authenticatedClient
      .get(`/setlist/band/${band.id}`)
      .then(res => {
        dispatch({
          type: ActionType.FETCH_SETLISTS_COMMIT,
          setlists: res.data as DTC.Setlist[]
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.FETCH_SETLISTS_ROLLBACK
        });
      });
  };
}

export function createSong(createSong: DTC.CreateSong) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.CREATE_SONG_SUBMIT
    });
    authenticatedClient
      .post("/song", createSong)
      .then(res => {
        dispatch({
          type: ActionType.CREATE_SONG_COMMIT,
          song: res.data as DTC.Song
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.CREATE_SONG_ROLLBACK
        });
      });
  };
}

export function editSong(song: DTC.EditSong) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.EDIT_SONG_SUBMIT
    });
    authenticatedClient
      .patch("/song", song)
      .then(res => {
        dispatch({
          type: ActionType.EDIT_SONG_COMMIT,
          song: res.data as DTC.Song
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.EDIT_SONG_ROLLBACK
        });
      });
  };
}

export function deleteSong(song: DTC.Song) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_SONG_SUBMIT
    });
    authenticatedClient
      .delete(`/song/${song.id}`)
      .then(res => {
        dispatch({
          type: ActionType.DELETE_SONG_COMMIT,
          song
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.DELETE_SONG_ROLLBACK,
          song
        });
      });
  };
}

export function fetchSongs(band: DTC.Band) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.FETCH_SONGS_SUBMIT
    });

    authenticatedClient
      .get(`/song/band/${band.id}`)
      .then(res => {
        dispatch({
          type: ActionType.FETCH_SONGS_COMMIT,
          songs: res.data as DTC.Song[]
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.FETCH_SONGS_ROLLBACK
        });
      });
  };
}

export function fetchListings(band: DTC.Band) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.FETCH_LISTINGS_SUBMIT
    });

    authenticatedClient
      .get(`/listing/band/${band.id}`)
      .then(res => {
        dispatch({
          type: ActionType.FETCH_LISTINGS_COMMIT,
          listings: res.data as DTC.Listing[]
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.FETCH_LISTINGS_ROLLBACK
        });
      });
  };
}

export function createListing(createListing: DTC.CreateListing) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.CREATE_LISTING_SUBMIT
    });
    authenticatedClient
      .post("/listing", createListing)
      .then(res => {
        dispatch({
          type: ActionType.CREATE_LISTING_COMMIT,
          listing: res.data as DTC.Listing
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.CREATE_LISTING_ROLLBACK
        });
      });
  };
}

export function deleteListing(listing: DTC.Listing) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_LISTING_SUBMIT
    });
    authenticatedClient
      .delete(`/listing/${listing.id}`)
      .then(res => {
        dispatch({
          type: ActionType.DELETE_LISTING_COMMIT,
          listing
        });
      })
      .catch(err => {
        dispatch({
          type: ActionType.DELETE_LISTING_ROLLBACK,
          listing
        });
      });
  };
}
