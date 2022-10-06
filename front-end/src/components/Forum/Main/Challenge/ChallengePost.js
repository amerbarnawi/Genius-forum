import React, { useEffect, useState } from "react";
import { useLoginDetails } from "../../Login/LoginProvider";
import { useComment } from "./CommentProvider";
import { useLike } from "./LikeProvider";

function ChallengePost({ originalChallenge }) {
  console.log(originalChallenge._id);
  const [challenge, setChallenge] = useState(originalChallenge);

  useEffect(() => {
    setChallenge(originalChallenge);
  }, [originalChallenge]);

  const currentDate = new Date(challenge.date);
  const likeArrayLength = challenge.interaction.likes.length;
  const commentArrayLength = challenge.interaction.comments.length;
  console.log(challenge._id);

  // const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState("");

  const { updateLike } = useLike();
  const { addComment, deleteComment } = useComment();

  const { userData } = useLoginDetails();

  // const likesIncludesUser = challenge.interaction.likes.includes(
  //   userData.email
  // );
  // if (!isLike && likesIncludesUser) {
  //   setIsLike(true);
  // }

  const getComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <div key={challenge._id} className="challenge-post">
      {console.log(challenge._id)}
      <h2>{challenge.title}</h2>
      <p>{currentDate.toDateString()}</p>
      <p>{challenge.body}</p>
      {challenge.image !== "" ? (
        <img src={`${challenge.image}`} alt={challenge.title} />
      ) : (
        ""
      )}

      <p>{likeArrayLength} like</p>

      <button onClick={() => updateLike(challenge, setChallenge)}>Like</button>
      <div>
        <textarea
          value={comment}
          name="comment"
          placeholder="Comment"
          onChange={getComment}
        ></textarea>
        <button onClick={() => addComment(challenge, setChallenge, comment)}>
          Submit
        </button>
      </div>
      <div>
        {commentArrayLength > 0
          ? challenge.interaction.comments.map((comment, index) => {
              return (
                <div key={index} id={comment.commentId}>
                  <h3>{comment.user}</h3>
                  <p>{comment.text}</p>
                  <button
                    onClick={() =>
                      deleteComment(
                        challenge,
                        setChallenge,
                        comment.id,
                        comment
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ChallengePost;
