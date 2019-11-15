import { DTC } from "../../dtc";
import { Dispatch, Action } from "redux";
import { unauthenticatedClient, authenticatedClient } from "../util/client";

export type LoginAction = Action<ActionType> & DTC.Token;
export type RegisterAction = Action<ActionType> & DTC.Token;
export type CreateBandAction = Action<ActionType> & DTC.Band;
export type CreateMembershipAction = Action<ActionType> & DTC.Membership;

export enum ActionType {
  LOGOUT = "LOGOUT",

  // login
  LOGIN_SUBMIT = "LOGIN_SUBMIT",
  LOGIN_COMMIT = "LOGIN_COMMIT",
  LOGIN_ROLLBACK = "LOGIN_ROLLBACK",

  // register
  REGISTER_SUBMIT = "REGISTER_SUBMIT",
  REGISTER_COMMIT = "REGISTER_COMMIT",
  REGISTER_ROLLBACK = "REGISTER_ROLLBACK",

  // create band
  CREATE_BAND_SUBMIT = "CREATE_BAND_SUBMIT",
  CREATE_BAND_COMMIT = "CREATE_BAND_COMMIT",
  CREATE_BAND_ROLLBACK = "CREATE_BAND_ROLLBACK",

  // create band
  CREATE_MEMBERSHIP_SUBMIT = "CREATE_MEMBERSHIP_SUBMIT",
  CREATE_MEMBERSHIP_COMMIT = "CREATE_MEMBERSHIP_COMMIT",
  CREATE_MEMBERSHIP_ROLLBACK = "CREATE_MEMBERSHIP_ROLLBACK"
}

export function logoutUser() {
  localStorage.removeItem("access_token");
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

export function createBand(createBand: DTC.CreateBand) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.REGISTER_SUBMIT
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
