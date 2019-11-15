import React from "react";
import { DTC } from "../../../../../dtc";
import { useFormik } from "formik";
import { connect, MapDispatchToPropsParam } from "react-redux";
import { AppState, QDispatchProp } from "../../../../redux/store";
import { startBand } from "../../../../redux/actions";

const initialValues: DTC.CreateBand = {
  name: ""
};

interface DispatchProps {
  dispatchCreateBand: (createBand: DTC.CreateBand) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  any
> = function(dispatch: QDispatchProp) {
  return {
    dispatchCreateBand: data => dispatch(startBand(data))
  };
};

function _CreateBand({ dispatchCreateBand }: DispatchProps) {
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
      dispatchCreateBand(values);
      actions.setSubmitting(true);
    }
  });

  return (
    <div className="container">
      <h1>Create a Band</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="enter a band name"
            type="text"
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export const CreateBand = connect<any, DispatchProps, any, AppState>(
  null,
  mapDispatchToProps
)(_CreateBand);
