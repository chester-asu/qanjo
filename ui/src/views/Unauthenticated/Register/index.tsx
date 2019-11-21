import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../../context/auth-context";
import { DTC } from "../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../redux/store";
import { ActionType } from "../../../redux/actions";

interface StateProps {
  registerError: string;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    registerError: state.registerError
  };
};

interface DispatchProps {
  dispatchClearErrors: () => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchClearErrors: () => dispatch({ type: ActionType.CLEAR_ERRORS })
  };
};

type Props = StateProps & DispatchProps & { dispatch?: QDispatchProp };

const initialValues: DTC.Register = {
  username: "",
  password: "",
  email: ""
};

function _Register({ registerError, dispatchClearErrors }: Props) {
  const { register } = useAuth();

  useEffect(() => {
    dispatchClearErrors();
  }, []);

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
      register(values);
      actions.setSubmitting(true);
    }
  });

  return (
    <div className="container">
      <h1>Register</h1>
      <div className="error-message">{registerError}</div>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export const Register = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_Register);
