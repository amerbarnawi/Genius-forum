import React from "react";
import { Link } from "react-router-dom";

function ChallengeCard({ challenge }) {
  const path = `/forum/challenge/${challenge._id}`;

  return (
    <Link to={path}>
      <div>
        <h3>{challenge.title}</h3>
        <p>{challenge.date}</p>
        <p>{challenge.publisher}</p>
      </div>
    </Link>
  );
}

export default ChallengeCard;
