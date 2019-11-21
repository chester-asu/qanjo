import React, { useState } from "react";
import { Modal } from "../../../../../common/Modal";
import { SetlistList } from "./SetlistList";
import { AddSetlist } from "./AddSetlist";

export function SetlistsHome() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <button className="btn float-right" onClick={() => setShowModal(true)}>
        Add Setlist
      </button>
      <h1>Setlists</h1>
      <SetlistList></SetlistList>
      <Modal
        children={<AddSetlist onDone={() => setShowModal(false)} />}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </div>
  );
}
