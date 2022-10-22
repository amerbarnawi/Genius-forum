import express from "express";
import forumRouter from "./routes/forumRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import chatRouter from "./routes/chatRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/forum/challenge", forumRouter);
app.use("/api/forum/chat", chatRouter);

// app.post("/post", (req, res) => {
//   console.log("Connected to React");
//   res.redirect("/");
// });

export default app;
