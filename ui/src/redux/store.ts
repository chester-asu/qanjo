import { createStore, Store, applyMiddleware, AnyAction, compose } from "redux";
import { reducers } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";
import { DTC } from "../../dtc";

const middleware = [thunk];

export interface AppState {
  token: string;
  bands: DTC.Band[];
  band: DTC.Band;
  songs: DTC.Song[];
}

export type QDispatchProp = ThunkDispatch<AppState, undefined, AnyAction>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware<QDispatchProp, any>(...middleware))
);
