import React from "react";
import { DTC } from "../../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../../redux/store";
import { createSetlist } from "../../../../../redux/actions";
import { useFormik } from "formik";
import { useBand } from "../../../../../context/band-context";
import { isInvalid } from "../../../../../util/isInvalid";

interface OwnProps {
  onDone: () => void;
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
  dispatchAddSetlist: (setlist: DTC.CreateSetlist) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = function(dispatch: QDispatchProp) {
  return {
    dispatchAddSetlist: setlist => dispatch(createSetlist(setlist))
  };
};

type Props = OwnProps &
  StateProps &
  DispatchProps & { dispatch?: QDispatchProp };

function _AddSetlist({ dispatchAddSetlist, onDone }: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: {
      title: "",
      bandID: useBand().id
    },
    onSubmit: (values, actions) => {
      dispatchAddSetlist(values);
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
            required={true}
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
            Add Setlist
          </button>
        </div>
      </form>
    </div>
  );
}

export const AddSetlist = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(_AddSetlist);
