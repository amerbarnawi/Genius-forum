import React, { useState } from "react";
import { useLoginDetails } from "../../Login/LoginProvider";
import { useLike } from "./LikeProvider";

function ChallengePost({ challenge }) {
  const currentDate = new Date(challenge.date);
  const likeArrayLength = challenge.interaction.likes.length;
  const commentArrayLength = challenge.interaction.comments.length;
  const [likes, setLikes] = useState(likeArrayLength);
  const [isLike, setIsLike] = useState(false);

  const { updateLike } = useLike();

  const { userData } = useLoginDetails();

  const likesIncludesUser = challenge.interaction.likes.includes(
    userData.email
  );

  if (!isLike && likesIncludesUser) {
    setIsLike(true);
  }

  return (
    <div key={challenge._id} className="challenge-post">
      <h2>{challenge.title}</h2>
      <p>{currentDate.toDateString()}</p>
      <p>{challenge.body}</p>
      {challenge.image !== "" ? (
        <img src={`${challenge.image}`} alt={challenge.title} />
      ) : (
        ""
      )}

      <p>{likes} like</p>
      <button
        onClick={() =>
          updateLike(challenge, likes, setLikes, setIsLike, isLike)
        }
      >
        Like
      </button>
      {commentArrayLength > 0
        ? challenge.interaction.comments.map((comment, index) => {
            return (
              <div key={index}>
                <h3>{comment.user}</h3>
                <p>{comment.text}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default ChallengePost;
