import React, { useState } from "react";
import { AddSong } from "./AddSong";
import { SongList } from "./SongList";
import { Modal } from "../../../../common/Modal";

export function Songs() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <h1>Songs</h1>
      <button className="btn" onClick={() => setShowModal(true)}>
        Add Song
      </button>
      <SongList></SongList>
      <Modal
        children={<AddSong onDone={() => setShowModal(false)} />}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      ></Modal>
    </div>
  );
}
