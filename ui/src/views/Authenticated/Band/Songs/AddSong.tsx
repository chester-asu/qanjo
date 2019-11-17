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
import { useBand } from "../../../../context/band-context";

interface OwnProps {
  onDone: () => void;
}

interface StateProps {
  token: string;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  OwnProps,
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
  OwnProps
> = function(dispatch: QDispatchProp) {
  return {
    dispatchAddSong: song => dispatch(createSong(song))
  };
};

type Props = OwnProps &
  StateProps &
  DispatchProps & { dispatch?: QDispatchProp };

function _AddSong({ dispatchAddSong, onDone }: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting
  } = useFormik({
    initialValues: {
      title: "",
      key: "",
      bandID: useBand().id
    },
    onSubmit: (values, actions) => {
      dispatchAddSong(values);
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
        <div className="form-group">
          <label>Key</label>
          <input
            value={values.key}
            onChange={handleChange}
            onBlur={handleBlur}
            name="key"
            placeholder="enter a key"
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
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}

export const AddSong = connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_AddSong);
