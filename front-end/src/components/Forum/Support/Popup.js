import React from "react";
import { MdClose } from "react-icons/md";

function Popup(props) {
  const updateTrigger = () => {
    props.setTrigger(false);
  };
  return props.isTrigger ? (
    <div className="popup-external">
      <div className="popup-internal">
        <button onClick={() => updateTrigger()} className="close-button">
          <MdClose />
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
