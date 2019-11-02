import { createStore, Store, applyMiddleware, AnyAction } from "redux";
import { reducers } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";

const middleware = [thunk];

export const store = createStore(
  reducers,
  applyMiddleware<ThunkDispatch<any, undefined, AnyAction>, any>(...middleware)
);
