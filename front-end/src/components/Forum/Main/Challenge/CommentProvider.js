import React, { useContext, createContext } from "react";
import { useLoginDetails } from "../../Login/LoginProvider";
import { v4 as uuid } from "uuid";

export const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ children }) {
  const { userData } = useLoginDetails();

  async function updateCommentFetch(challenge, commentBody) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(commentBody),
    };

    const url = `http://localhost:5000/api/forum/challenge/comment/${challenge._id}?email=${userData.email}&password=${userData.password}`;
    await fetch(url, requestOptions);
  }

  const addComment = async (challenge, setChallenge, comment) => {
    const commentBody = {
      action: "add",
      text: comment,
      user: userData.userName,
    };
    challenge.interaction.comments.push({
      user: userData.userName,
      text: comment,
      id: uuid(),
    });
    setChallenge((challenge) => {
      return { ...challenge };
    });
    updateCommentFetch(challenge, commentBody);
  };

  const deleteComment = async (challenge, setChallenge, commentId, comment) => {
    if (comment.user !== userData.userName) {
      return;
    }
    const commentBody = {
      action: "delete",
      commentId: commentId,
    };
    const newCommentsArray = challenge.interaction.comments.filter(
      (comment) => comment.id !== commentId
    );
    challenge.interaction.comments = newCommentsArray;
    setChallenge((challenge) => {
      return { ...challenge };
    });
    updateCommentFetch(challenge, commentBody);
  };

  return (
    <CommentContext.Provider value={{ addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
}
