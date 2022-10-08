import React, { useEffect, useState } from "react";
import FavoriteIcon from "../../Favorites/FavoriteIcon";
import Popup from "../../Support/Popup";
import { useComment } from "./CommentProvider";
import DeleteChallenge from "./DeleteChallenge";
import { useLike } from "./LikeProvider";

function ChallengePost({ originalChallenge }) {
  const [challenge, setChallenge] = useState(originalChallenge);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setChallenge(originalChallenge);
  }, [originalChallenge]);

  const currentDate = new Date(challenge.date);
  const likeArrayLength = challenge.interaction.likes.length;
  const commentArrayLength = challenge.interaction.comments.length;

  const [comment, setComment] = useState("");
  const { updateLike } = useLike();
  const { addComment, deleteComment } = useComment();

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const triggerPopup = () => {
    setTrigger(true);
  };

  return (
    <div key={challenge._id} className="challenge-post">
      <FavoriteIcon ChallengeId={challenge._id} />

      <button onClick={triggerPopup}>Delete</button>
      <Popup isTrigger={trigger} setTrigger={setTrigger}>
        <DeleteChallenge challengeId={challenge._id} />
      </Popup>

      <h2>{challenge.title}</h2>
      <p>{challenge.publisher}</p>
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
