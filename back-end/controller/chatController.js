import dbConnection from "../dbConnection.js";
import { errorMessage } from "../support/helper.js";
import { ObjectId } from "mongodb";

// Update the chat room:

export async function updateChat(req, res) {
  const { userLogo, userName, message } = req.body;

  try {
    async function updateData(chatCollection) {
      await chatCollection.updateOne(
        { _id: ObjectId("635470f566f98dbcd641052f") },
        {
          $push: {
            publicChatRoom: {
              userLogo: userLogo,
              userName: userName,
              message: message,
            },
          },
        }
      );
      res.status(201).json({ message: "Message added to the chat!" });
    }

    await dbConnection(updateData, "chat");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Get the chat messages
export async function getChatMessages(req, res) {
  const id = "635470f566f98dbcd641052f";

  try {
    async function readData(chatCollection) {
      const chatMessages = await chatCollection.findOne({ _id: ObjectId(id) });

      if (chatMessages) {
        res.status(200).json(chatMessages.publicChatRoom);
      }
    }
    await dbConnection(readData, "chat");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Get online users array
export async function getOnlineUsers(req, res) {
  const id = "63531cbf4720732917b8e1c6";

  try {
    async function readData(onlineCollection) {
      const onlineUsers = await onlineCollection.findOne({ _id: ObjectId(id) });

      if (onlineUsers) {
        res.status(200).json(onlineUsers.onlineUsers);
      } else {
        res.status(404).json({ message: "You are alone!" });
      }
    }
    await dbConnection(readData, "online");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Add and delete from online users array
export async function updateOnlineUsers(req, res) {
  const onlineUserDetails = req.body;

  const newUser = {
    email: onlineUserDetails.email,
    userName: onlineUserDetails.userName,
    logo: onlineUserDetails.logo,
  };

  try {
    async function updateData(onlineCollection) {
      if (onlineUserDetails.action === "add") {
        await onlineCollection.updateOne(
          { _id: ObjectId("63531cbf4720732917b8e1c6") },
          { $push: { onlineUsers: newUser } }
        );
        res
          .status(201)
          .json({ message: "Adding user to online array is done!" });
      } else if (onlineUserDetails.action === "delete") {
        await onlineCollection.updateOne(
          { _id: ObjectId("63531cbf4720732917b8e1c6") },
          { $pull: { onlineUsers: { email: onlineUserDetails.email } } }
        );
        res
          .status(201)
          .json({ message: "Deleting user from online array is done!" });
      }
    }

    await dbConnection(updateData, "online");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}
