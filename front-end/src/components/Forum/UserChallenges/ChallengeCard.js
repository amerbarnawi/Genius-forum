import React from "react";
import { Link } from "react-router-dom";

function ChallengeCard({ challenge }) {
  const path = `/forum/challenge/${challenge._id}`;

  const currentDate = new Date(challenge.date);

  return (
    <Link to={path} className="challenge-card-link">
      <div className="challenge-card">
        <h3>{challenge.title}</h3>
        <p>{currentDate.toDateString()}</p>
        <p>{challenge.userName ? challenge.userName : " Admin"}</p>
      </div>
    </Link>
  );
}

export default ChallengeCard;
