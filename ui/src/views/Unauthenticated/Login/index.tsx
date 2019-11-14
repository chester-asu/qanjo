import React from "react";
import { useAuth } from "../../../context/auth-context";
import { useFormik } from "formik";
import { DTC } from "../../../../dtc";

const initialValues: DTC.Login = {
  username: "",
  password: ""
};

export function Login() {
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
    <form onSubmit={handleSubmit}>
      <div>
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
      <div>
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
        <button type="submit" disabled={disableSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}
