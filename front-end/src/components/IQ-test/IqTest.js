import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import iq_question from "../../assets/IQ-test/iq-question.png";
import answer_1 from "../../assets/IQ-test/iq-answer-1.png";
import answer_2 from "../../assets/IQ-test/iq-answer-2.png";
import answer_3 from "../../assets/IQ-test/iq-answer-3.png";
import answer_4 from "../../assets/IQ-test/iq-answer-4.png";
import answer_5 from "../../assets/IQ-test/iq-answer-5.png";
import { MdLockOpen, MdLockOutline, MdAdsClick } from "react-icons/md";

function IqTest() {
  const [isTrue, setIsTrue] = useState(undefined);
  const answers = [answer_1, answer_2, answer_3, answer_4, answer_5];

  const randomScore = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
  const path = `/signUp/${randomScore}`;

  const checkAnswer = (index) => {
    if (index === 3) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  };

  return (
    <main className="iq-test-container">
      <h1>Welcome to the IQ test.</h1>
      <div className="iq-banner">
        {isTrue ? <MdLockOpen /> : <MdLockOutline />}
        <h3>
          {isTrue === undefined
            ? ""
            : isTrue
            ? "Correct answer!"
            : "Wrong answer, try again!"}
        </h3>

        {!isTrue ? (
          ""
        ) : (
          <div className="iq-pass-message">
            <p>You can sign up as a user in the forum.</p>
            <p>{`Your random score is : ( ${randomScore} / 100 )`}</p>
            <NavLink to={path}>
              Sign up <MdAdsClick />
            </NavLink>
          </div>
        )}
      </div>

      <div>
        <div className="iq-question-div">
          <img src={iq_question} alt="IQ question." />
        </div>
        <div className="iq-answers">
          <h2>Which is the missing square?</h2>
          <div>
            {answers.map((answer, index) => (
              <div key={index}>
                <img
                  src={answer}
                  alt="Answer of IQ question."
                  onClick={() => checkAnswer(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default IqTest;
