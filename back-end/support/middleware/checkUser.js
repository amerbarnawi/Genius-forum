import dbConnection from "../../dbConnection.js";
import { errorMessage } from "../helper.js";

// Checking if the user is available:
export async function isUserFound(req, res, next) {
  const { email } = req.body;

  try {
    async function readData(userCollection) {
      const registeredUser = await userCollection.findOne({ email: email });

      if (registeredUser) {
        res
          .status(400)
          .json({ message: "Sorry, this account is already exist!" });
      } else {
        next();
      }
    }
    await dbConnection(readData, "user");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}
