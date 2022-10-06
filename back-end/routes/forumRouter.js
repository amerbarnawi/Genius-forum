import express from "express";
import {
  findChallengeById,
  createChallenge,
  findChallengeByTitle,
  updateChallenge,
  deleteChallenge,
  editLike as editLike,
  editComment as editComment,
} from "../controller/forumController.js";
import isUserAuthenticated from "../support/middleware/authentication.js";

import { isChallengeFound } from "../support/middleware/checkChallenge.js";
import { isPublisher } from "../support/middleware/checkPublisher.js";

const forumRouter = express.Router();

forumRouter.use(express.urlencoded({ extended: false }));

// Authentication:
//=====================================
forumRouter.use(isUserAuthenticated);
//=====================================

// Create challenge:
forumRouter.post("/create", createChallenge);

// Finding challenge by title:
forumRouter.get("/title", findChallengeByTitle);

// Find challenge by id:
forumRouter.get("/:id", findChallengeById);

// Update challenge:
forumRouter.put("/update/:id", isChallengeFound, isPublisher, updateChallenge);

// Delete challenge:
forumRouter.delete(
  "/delete/:id",
  isChallengeFound,
  isPublisher,
  deleteChallenge
);

// Adding Like:
forumRouter.put("/like/:id", isChallengeFound, editLike);

// Adding Comment:
forumRouter.put("/comment/:id", isChallengeFound, editComment);

forumRouter.get("/", findChallengeByTitle);

export default forumRouter;
