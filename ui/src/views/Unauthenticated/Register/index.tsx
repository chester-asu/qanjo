import React from "react";
import { useFormik } from "formik";
import { useAuth } from "../../../context/auth-context";
import { DTC } from "../../../../dtc";

const initialValues: DTC.Register = {
  username: "",
  password: "",
  email: ""
};

export function Register() {
  const { register } = useAuth();

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

  const disableSubmit =
    isSubmitting ||
    Object.keys(errors).length > 0 ||
    Object.keys(touched).length === 0;

  return (
    <div className="container">
      <h1>Register</h1>
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
          <button className="btn" type="submit" disabled={disableSubmit}>
            Howdy
          </button>
        </div>
      </form>
    </div>
  );
}
