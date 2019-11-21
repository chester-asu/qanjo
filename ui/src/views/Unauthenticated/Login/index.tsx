import React from "react";
import { useAuth } from "../../../context/auth-context";
import { useFormik } from "formik";
import { DTC } from "../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../redux/store";

interface StateProps {
  loginError: string;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    loginError: state.loginError
  };
};

interface DispatchProps {}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {};
};

type Props = StateProps & DispatchProps & { dispatch?: QDispatchProp };

const initialValues: DTC.Login = {
  username: "",
  password: ""
};

function _Login({ loginError }: Props) {
  const { login } = useAuth();

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
      login(values);
      actions.setSubmitting(true);
    }
  });

  const disableSubmit =
    isSubmitting ||
    Object.keys(errors).length > 0 ||
    Object.keys(touched).length === 0;

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="error-message">{loginError}</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            placeholder="username"
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
            placeholder="password"
            type="password"
          />
        </div>
        <div>
          <button className="btn" type="submit" disabled={disableSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export const Login = connect<StateProps, DispatchProps, any, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_Login);
