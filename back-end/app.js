import express from "express";

import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Done");
});

app.use("/api/user", userRouter);

export default app;
