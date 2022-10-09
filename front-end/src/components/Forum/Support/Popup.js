import React from "react";
import { MdClose } from "react-icons/md";

function Popup(props) {
  const updateTrigger = () => {
    props.setTrigger(false);
  };
  return props.isTrigger ? (
    <div>
      <div>
        <button onClick={() => updateTrigger()}>
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
