import { DTC } from "../../dtc";
import { Dispatch, Action } from "redux";
import { unauthenticatedClient, authenticatedClient } from "../util/client";

export type LoginAction = Action<ActionType> & DTC.Token;
export type RegisterAction = Action<ActionType> & DTC.Token;
export type CreateBandAction = Action<ActionType> & { band: DTC.Band };
export type FetchBandsAction = Action<ActionType> & { bands: DTC.Band[] };
export type CreateMembershipAction = Action<ActionType> & {
  membership: DTC.Membership;
};
export type SetBandAction = Action<ActionType> & { band: DTC.Band };
export type CreateSongAction = Action<ActionType> & { song: DTC.Song };

export enum ActionType {
  LOGOUT = "LOGOUT",

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

  CREATE_SONG_SUBMIT = "CREATE_SONG_SUBMIT",
  CREATE_SONG_COMMIT = "CREATE_SONG_COMMIT",
  CREATE_SONG_ROLLBACK = "CREATE_SONG_ROLLBACK",

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

export function fetchSongs(band: DTC.Band) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.FETCH_SONGS_SUBMIT
    });
    authenticatedClient
      .get(`/song/band/${band.id}`)
      .then(res => {
        dispatch({
          type: ActionType.FETCH_SONGS_SUBMIT,
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
