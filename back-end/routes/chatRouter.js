import express from "express";
import {
  getChatMessages,
  getOnlineUsers,
  updateChat,
  updateOnlineUsers,
} from "../controller/chatController.js";
import isUserAuthenticated from "../support/middleware/authentication.js";

const chatRouter = express.Router();

chatRouter.use(express.urlencoded({ extended: false }));
chatRouter.use(isUserAuthenticated);

// Chat room
chatRouter.put("/public", updateChat);

//Get Chat Messages
chatRouter.get("/public/messages", getChatMessages);

// Update online users
chatRouter.put("/public/online", updateOnlineUsers);

//Get online users
chatRouter.get("/public/online-users", getOnlineUsers);

export default chatRouter;
