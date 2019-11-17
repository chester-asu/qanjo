import React from "react";
import "./style.scss";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onRequestClose: () => void;
}

export function Modal({ children, visible, onRequestClose }: Props) {
  return visible ? (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onRequestClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  ) : null;
}
