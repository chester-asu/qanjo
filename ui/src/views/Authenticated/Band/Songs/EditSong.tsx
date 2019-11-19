import React from "react";
import { DTC } from "../../../../../dtc";
import {
  MapStateToPropsParam,
  connect,
  MapDispatchToPropsParam
} from "react-redux";
import { AppState, QDispatchProp } from "../../../../redux/store";
import { editSong, deleteSong } from "../../../../redux/actions";
import { useFormik } from "formik";
import { isInvalid } from "../../../../util/isInvalid";

interface OwnProps {
  onDone: () => void;
  song: DTC.Song;
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
  dispatchEditSong: (song: DTC.EditSong) => void;
  dispatchDeleteSong: (song: DTC.Song) => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<
  DispatchProps,
  OwnProps
> = function(dispatch: QDispatchProp) {
  return {
    dispatchEditSong: values => dispatch(editSong(values)),
    dispatchDeleteSong: song => dispatch(deleteSong(song))
  };
};

type Props = OwnProps &
  StateProps &
  DispatchProps & { dispatch?: QDispatchProp };

function _EditSong({
  dispatchEditSong,
  dispatchDeleteSong,
  onDone,
  song
}: Props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: song,
    onSubmit: (values, actions) => {
      dispatchEditSong(values);
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
            disabled={isSubmitting || isInvalid({ values, errors })}
          >
            Update Song
          </button>
          <a
            className="btn danger float-right"
            onClick={() => {
              dispatchDeleteSong(song);
              onDone();
            }}
          >
            Delete Song
          </a>
        </div>
      </form>
    </div>
  );
}

export const EditSong = connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(_EditSong);
