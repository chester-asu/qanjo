// import React from "react";
// import { DTC } from "../../../../../dtc";
// import {
//   MapStateToPropsParam,
//   connect,
//   MapDispatchToPropsParam
// } from "react-redux";
// import { AppState, QDispatchProp } from "../../../../redux/store";

// interface StateProps {
//   token: string;
// }

// const mapStateToProps: MapStateToPropsParam<
//   StateProps,
//   any,
//   AppState
// > = function(state) {
//   return {
//     token: state.token
//   };
// };

// interface DispatchProps {
//   dispatchFunction: () => void;
// }

// const mapDispatchToProps: MapDispatchToPropsParam<
//   DispatchProps,
//   any
// > = function(dispatch: QDispatchProp) {
//   return {
//     dispatchFunction: () => {}
//   };
// };

// type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

// function _MyComponent({ token, dispatch }: Props) {
//   return <div>{token}</div>;
// }

// export const MyComponent = connect<StateProps, DispatchProps, any, AppState>(
//   mapStateToProps,
//   mapDispatchToProps
// )(_MyComponent);
