import React from "react";
import { DTC } from "../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../redux/store";
import { createSong } from "../../../../redux/actions";
import { useFormik } from "formik";

interface StateProps {
  token: string;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    token: state.token
  };
};

interface DispatchProps {
  dispatchAddSong: (song: DTC.CreateSong) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchAddSong: song => dispatch(createSong(song))
  };
};

type Props = StateProps & DispatchProps & { dispatch: QDispatchProp };

const initialValues: DTC.CreateSong = {
  title: "",
  key: "",
  bandID: (null as any) as number
};

function _AddSong({ token, dispatch }: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting
  } = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      // register(values);
      actions.setSubmitting(true);
    }
  });

  return (
    <div className="container">
      <h1>Register</h1>
      {/* <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            placeholder="enter a username"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            placeholder="enter a password"
            type="password"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            placeholder="enter your email"
            type="email"
          />
        </div>
        <div>
          <button
            className="btn"
            type="submit"
            disabled={
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              Object.keys(touched).length === 0
            }
          >
            Howdy
          </button>
        </div>
      </form> */}
    </div>
  );
}

export const AddSong = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_AddSong);
