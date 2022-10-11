import React from "react";
import { NavLink } from "react-router-dom";
import iqTest from "../../assets/welcome-page/iq-test.jpeg";
import { MdSchool } from "react-icons/md";

function IqInfo() {
  return (
    <div className="iq-info">
      <div>
        <img src={iqTest} alt="brain" />
      </div>

      <div>
        <h2>Intelligence quotient (IQ)</h2>
        <p>
          Is a total score derived from a set of standardized tests or subtests
          designed to assess human intelligence. <br />
          The abbreviation "IQ" was coined by the psychologist William Stern for
          the German term "Intelligenzquotient". <br />
          IQ scores are used for educational placement, assessment of
          intellectual disability, and evaluation of job applicants.
        </p>
        <NavLink to="/iq-test">
          IQ test
          <MdSchool />
        </NavLink>
      </div>
    </div>
  );
}

export default IqInfo;
