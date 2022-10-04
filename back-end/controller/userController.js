import dbConnection from "../dbConnection.js";
import { ObjectId } from "mongodb";
import { errorMessage } from "../support/helper.js";

//Login:
export async function login(req, res) {
  const email = req.query.email;

  try {
    async function readData(userCollection) {
      const registeredUser = await userCollection.findOne({ email: email });

      res.status(200).json(registeredUser);
    }
    await dbConnection(readData, "user");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Creating new user:
export async function createUser(req, res) {
  const { userName, password, email, logo } = req.body;

  if (!userName || !password || !email) {
    res
      .status(400)
      .json({ message: "Please, send all data to create a new user!" });
    return;
  }

  try {
    async function writeData(usersCollection) {
      await usersCollection.insertOne({
        userName: userName,
        email: email,
        password: password,
        logo: logo,
        date: new Date(),
      });
    }

    await dbConnection(writeData, "user");

    res.status(201).json({ message: "Creating the user is done!" });
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Deleting a user:
export async function deleteAccount(req, res) {
  const id = req.params.id;

  try {
    async function deleteData(usersCollection) {
      await usersCollection.deleteOne({ _id: ObjectId(id) });

      res
        .status(200)
        .json({ message: "Deleting your account is done, we will miss you!" });
    }

    await dbConnection(deleteData, "user");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************
// Updating user data:

export async function updateUserData(req, res) {
  const id = req.params.id;

  const { userName, password, email } = req.body;

  if (!userName || !password || !email) {
    res
      .status(400)
      .json({ message: "Please, send all data to update your account!" });
    return;
  }

  try {
    async function updateData(userCollection) {
      await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { userName, password, email } }
      );

      res.status(201).json({ message: "Updating your account is done!" });
    }

    await dbConnection(updateData, "user");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************
