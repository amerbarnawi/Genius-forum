import express from "express";
import forumRouter from "./routes/forumRouter.js";

import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/forum/challenge", forumRouter);

export default app;
