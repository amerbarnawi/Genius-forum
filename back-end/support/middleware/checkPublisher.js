import { errorMessage } from "../helper.js";
import dbConnection from "../../dbConnection.js";
import { ObjectId } from "mongodb";

// Checking if the editor is the publisher:
export async function isPublisher(req, res, next) {
  const id = req.params.id;
  const { email } = req.query;

  try {
    async function readData(forumCollection) {
      const challenge = await forumCollection.findOne({ _id: ObjectId(id) });

      if (challenge.publisher === email) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "This challenge is not yours, you are not admin!" });
      }
    }
    await dbConnection(readData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}
