import React from "react";
import "./index.scss";

const Modal = ({ visible, setVisible, children }) => {
  return (
    <div className={`overlay animated ${visible && "show"}`}>
      <div className="modal">
        <svg
          height="200"
          viewBox="0 0 200 200"
          width="200"
          onClick={() => setVisible(false)}
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        {children}
      </div>
    </div>
  );
};

export default Modal;
