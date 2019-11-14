import React from "react";
import { DTC } from "../../../../dtc";
import { useFormik } from "formik";
import { connect, MapDispatchToPropsParam } from "react-redux";
import { AppState, QDispatchProp } from "../../../redux/store";
import { createBand } from "../../../redux/actions";

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
    dispatchCreateBand: data => dispatch(createBand(data))
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

  const disableSubmit =
    isSubmitting ||
    Object.keys(errors).length > 0 ||
    Object.keys(touched).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Band name</label>
        <input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          placeholder="band name"
          type="text"
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

export const CreateBand = connect<any, DispatchProps, any, AppState>(
  null,
  mapDispatchToProps
)(_CreateBand);
