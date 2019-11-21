import React from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { deleteSetlist, editSetlist } from "../../../../../redux/actions";
import { useFormik } from "formik";
import { isInvalid } from "../../../../../util/isInvalid";

interface OwnProps {
  onDone: () => void;
  setlist: DTC.Setlist;
}

interface StateProps {}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
  AppState
> = function(state) {
  return {};
};

interface DispatchProps {
  dispatchEditSetlist: (values: DTC.EditSetlist) => void;
  dispatchDeleteSetlist: (values: DTC.Setlist) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = function(dispatch: QDispatchProp) {
  return {
    dispatchEditSetlist: values => dispatch(editSetlist(values)),
    dispatchDeleteSetlist: values => dispatch(deleteSetlist(values))
  };
};

type Props = OwnProps &
  StateProps &
  DispatchProps & { dispatch?: QDispatchProp };

function _EditSetlist({
  dispatchEditSetlist,
  dispatchDeleteSetlist,
  onDone,
  setlist
}: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: setlist,
    onSubmit: (values, actions) => {
      dispatchEditSetlist(values);
      actions.setSubmitting(true);
      onDone();
    }
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
            placeholder="enter a title"
            type="text"
          />
        </div>
        <div>
          <button
            className="btn"
            type="submit"
            disabled={isSubmitting || isInvalid({ values, errors })}
          >
            Update Setlist
          </button>
          <a
            className="btn danger float-right"
            onClick={() => {
              dispatchDeleteSetlist(setlist);
              onDone();
            }}
          >
            Delete Setlist
          </a>
        </div>
      </form>
    </div>
  );
}

export const EditSetlist = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(_EditSetlist);
