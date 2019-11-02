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
    <form onSubmit={handleSubmit}>
      <div>
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
      <div>
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
      <div>
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
        <button type="submit" disabled={disableSubmit}>
          Howdy
        </button>
      </div>
    </form>
  );
}
