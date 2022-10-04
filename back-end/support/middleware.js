import dbConnection from "../dbConnection.js";
import { errorMessage } from "./helper.js";

// User middleware:

// Authentication:
export default async function isUserAuthenticated(req, res, next) {
  const email = req.query.email;
  const password = req.query.password;

  try {
    async function readData(userCollection) {
      const registeredUser = await userCollection.findOne({ email: email });

      if (registeredUser) {
        if (
          registeredUser.email === email &&
          registeredUser.password === password
        ) {
          next();
        } else {
          res.status(400).json({
            message:
              "Wrong email and password combination, please check again!",
          });
        }
      } else {
        res.status(404).json({
          message: "Sorry, can not find account by this e-mail!",
        });
      }
    }
    await dbConnection(readData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please, try later!" });
  }
}

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
    await dbConnection(readData);
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}
