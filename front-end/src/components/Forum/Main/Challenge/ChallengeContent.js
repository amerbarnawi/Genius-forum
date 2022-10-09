import React from "react";

function ChallengeContent({ challenge }) {
  const currentDate = new Date(challenge.date);

  return (
    <div className="post-body">
      <div className="post-banner">
        <h2>{challenge.title}</h2>
        <p>By:{challenge.publisher}</p>
        <p>{currentDate.toDateString()}</p>
      </div>

      <p className="challenge-body">{challenge.body}</p>
      {challenge.image !== "" ? (
        <img
          src={`${challenge.image}`}
          alt={challenge.title}
          className="challenge-image"
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ChallengeContent;
