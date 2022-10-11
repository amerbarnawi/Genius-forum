import React, { useEffect, useState } from "react";
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
  const [isChallengeHidden, setIsChallengeHidden] = useState(false);

  useEffect(() => {
    setChallenge(originalChallenge);
  }, [originalChallenge]);

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
        <div
          className={isChallengeHidden ? "challenge-hidden" : "challenge-post"}
        >
          <Popup isTrigger={trigger} setTrigger={setTrigger}>
            <DeleteChallenge
              challengeId={challenge._id}
              setIsChallengeHidden={setIsChallengeHidden}
            />
          </Popup>

          <ChallengeContent challenge={challenge} />

          <div className="interaction-area">
            <p>
              {likeArrayLength} <MdThumbUp />
            </p>
            <p>{challenge.interaction.comments.length} Comments</p>
          </div>

          <div className="post-navbar">
            <button onClick={() => updateLike(challenge, setChallenge)}>
              Like
              <MdThumbUp className="icon" />
            </button>
            <button onClick={() => changeCommentsAreaVisibility()}>
              Comment
              <MdComment className="icon" />
            </button>
            <button onClick={() => updateChallenge()}>
              Update <MdEdit className="icon" />
            </button>
            <button onClick={triggerPopup}>
              Delete <MdDelete className="icon" />
            </button>
          </div>

          {!isComments ? (
            ""
          ) : (
            <div className="comments-area">
              <div className="comment-form">
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
              <div className="comments-container">
                {commentArrayLength > 0
                  ? challenge.interaction.comments.map((comment, index) => {
                      return (
                        <div
                          key={index}
                          id={comment.commentId}
                          className="comment"
                        >
                          <div>
                            <h3>{comment.user}</h3>
                            <p>{comment.text}</p>
                          </div>
                          <div>
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
                              <MdDelete className="delete-comment-icon" />
                            </button>
                          </div>
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
