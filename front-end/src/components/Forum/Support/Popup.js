import React from "react";

function Popup(props) {
  return props.isTrigger ? (
    <div>
      <div>
        <button onClick={() => props.setTrigger(false)}>Close</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
