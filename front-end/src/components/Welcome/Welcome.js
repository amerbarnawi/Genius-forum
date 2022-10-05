import React from "react";
import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <main>
      <h3>Welcome to my application!</h3>
      <NavLink to="/iq-test">IQ-test</NavLink>
      <NavLink to="/forum">Forum</NavLink>
    </main>
  );
}

export default Welcome;
