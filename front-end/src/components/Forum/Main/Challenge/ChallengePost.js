import React, { useEffect, useState } from "react";
import FavoriteIcon from "../../Favorites/FavoriteIcon";
import Popup from "../../Support/Popup";
import { useComment } from "./CommentProvider";
import DeleteChallenge from "./DeleteChallenge";
import { useLike } from "./LikeProvider";
import UpdateChallenge from "./UpdateChallenge";
import { MdDelete, MdEdit, MdThumbUp, MdComment, MdSend } from "react-icons/md";
import ChallengeContent from "./ChallengeContent";

// Here are all the components of the challenge ( Post )
function ChallengePost({ originalChallenge }) {
  const [challenge, setChallenge] = useState(originalChallenge);
  const [trigger, setTrigger] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isComments, setIsComments] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  // if (refresh) {
  //   setRefresh(false);
  // }

  useEffect(() => {
    setChallenge(originalChallenge);
  }, [originalChallenge]);

  // const currentDate = new Date(challenge.date);
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

  const updateChallenge = () => {
    setIsUpdate(true);
  };

  const changeCommentsAreaVisibility = () => {
    if (isComments) {
      setIsComments(false);
    } else {
      setIsComments(true);
    }
  };

  return (
    <div key={challenge._id}>
      {isUpdate ? (
        <UpdateChallenge challenge={challenge} setIsUpdate={setIsUpdate} />
      ) : (
        <div className="challenge-post">
          <FavoriteIcon ChallengeId={challenge._id} className="favorite-icon" />

          <Popup isTrigger={trigger} setTrigger={setTrigger}>
            <DeleteChallenge challengeId={challenge._id} />
          </Popup>

          <ChallengeContent challenge={challenge} />

          {/* <div className="post-banner">
            <h2>{challenge.title}</h2>
            <p>By:{challenge.publisher}</p>
            <p>{currentDate.toDateString()}</p>
          </div>

          <p>{challenge.body}</p>
          {challenge.image !== "" ? (
            <img
              src={`${challenge.image}`}
              alt={challenge.title}
              className="challenge-image"
            />
          ) : (
            ""
          )} */}

          <div className="interaction-area">
            <p>
              {likeArrayLength} <MdThumbUp />
            </p>
            <p>{challenge.interaction.comments.length} Comments</p>
          </div>

          <div className="post-navbar">
            <button onClick={() => updateLike(challenge, setChallenge)}>
              Like
              <MdThumbUp />
            </button>
            <button onClick={() => changeCommentsAreaVisibility()}>
              Comment
              <MdComment />
            </button>
            <button onClick={() => updateChallenge()}>
              Update <MdEdit />
            </button>
            <button onClick={triggerPopup}>
              Delete <MdDelete />
            </button>
          </div>

          {!isComments ? (
            ""
          ) : (
            <div className="comments-area">
              <div>
                <textarea
                  value={comment}
                  name="comment"
                  placeholder="Comment"
                  onChange={getComment}
                ></textarea>
                <button
                  onClick={() => addComment(challenge, setChallenge, comment)}
                >
                  Submit <MdSend />
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
                            <MdDelete />
                          </button>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengePost;
