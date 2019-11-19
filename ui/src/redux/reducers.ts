import { combineReducers } from "redux";
import {
  ActionType,
  LoginAction,
  FetchBandsAction,
  SetBandAction,
  CreateBandAction,
  CreateSongAction,
  FetchSongsAction
} from "./actions";
import { DTC } from "../../dtc";

function token(
  state = localStorage.getItem("token") || "",
  action: LoginAction
) {
  switch (action.type) {
    case ActionType.REGISTER_SUBMIT:
    case ActionType.REGISTER_ROLLBACK:
    case ActionType.LOGOUT:
    case ActionType.LOGIN_SUBMIT:
    case ActionType.LOGIN_ROLLBACK: {
      return "";
    }
    case ActionType.REGISTER_COMMIT:
    case ActionType.LOGIN_COMMIT: {
      return action.token;
    }
    default: {
      return state;
    }
  }
}

function band(
  state: DTC.Band = (JSON.parse(
    localStorage.getItem("band") || "null"
  ) as any) as DTC.Band,
  action: SetBandAction & CreateBandAction
) {
  switch (action.type) {
    case ActionType.CREATE_BAND_COMMIT:
    case ActionType.SET_BAND: {
      return action.band;
    }
    case ActionType.UNSET_BAND: {
      return (null as any) as DTC.Band;
    }
    default: {
      return state;
    }
  }
}

function bands(state: DTC.Band[] = [], action: FetchBandsAction) {
  switch (action.type) {
    case ActionType.FETCH_BANDS_COMMIT: {
      return [...action.bands];
    }
    default: {
      return state;
    }
  }
}

function songs(
  state: DTC.Song[] = [],
  action: CreateSongAction & FetchSongsAction
) {
  switch (action.type) {
    case ActionType.FETCH_SONGS_COMMIT: {
      return [...action.songs];
    }
    case ActionType.CREATE_SONG_COMMIT: {
      return [...state, action.song];
    }
    case ActionType.EDIT_SONG_COMMIT: {
      const idx = state.findIndex(song => song.id === action.song.id);
      state.splice(idx, 1, action.song);
      return [...state];
    }
    case ActionType.DELETE_SONG_COMMIT: {
      const idx = state.findIndex(song => song.id === action.song.id);
      state.splice(idx, 1);
      return [...state]
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({ token, bands, band, songs });
