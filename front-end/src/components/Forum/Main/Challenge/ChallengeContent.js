import React from "react";
import FavoriteIcon from "../../Favorites/FavoriteIcon";

function ChallengeContent({ challenge }) {
  const currentDate = new Date(challenge.date);

  return (
    <div className="post-content">
      <div className="fav-icon-and-post-info">
        <div className="post-info-with-logo">
          <div className="user-logo">
            <img src={challenge.userLogo} alt="user-logo" />
          </div>
          <div className="post-info">
            <h2 className="post-title">{challenge.title}</h2>
            <p>
              By:{" "}
              {challenge.userName ? challenge.userName.toUpperCase() : "Admin"}
            </p>
            <p>{currentDate.toDateString()}</p>
          </div>
        </div>
        <FavoriteIcon ChallengeId={challenge._id} className="favorite-icon" />
      </div>

      <div
        className="challenge-body"
        dangerouslySetInnerHTML={{ __html: challenge.body }}
      ></div>

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
