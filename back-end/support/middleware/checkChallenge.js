import { errorMessage } from "../helper.js";
import { ObjectId } from "mongodb";
import dbConnection from "../../dbConnection.js";

// Checking if the challenge is available:
export async function isChallengeFound(req, res, next) {
  const id = req.params.id;

  try {
    async function readData(forumCollection) {
      const challenge = await forumCollection.findOne({ _id: ObjectId(id) });

      if (challenge) {
        next();
      } else {
        res.status(404).json({ message: "Sorry, this challenge is deleted!" });
      }
    }
    await dbConnection(readData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}
