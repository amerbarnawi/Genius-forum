import React from "react";

function Popup(props) {
  const updateTrigger = () => {
    props.setTrigger(false);
  };
  return props.isTrigger ? (
    <div>
      <div>
        <button onClick={() => updateTrigger()}>Close</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
