import { createStore, Store, applyMiddleware, AnyAction } from "redux";
import { reducers } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";

const middleware = [thunk];

export interface AppState {
  token: string;
}

export type QDispatchProp = ThunkDispatch<AppState, undefined, AnyAction>;

export const store = createStore(
  reducers,
  applyMiddleware<QDispatchProp, any>(...middleware)
);
