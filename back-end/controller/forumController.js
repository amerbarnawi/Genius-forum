import { ObjectId } from "mongodb";
import dbConnection from "../dbConnection.js";
import { errorMessage } from "../support/helper.js";
import { v4 as uuid } from "uuid";

// Creating challenge function:
export async function createChallenge(req, res) {
  const { title, body, image } = req.body;
  const { email } = req.query;

  if (!title || !body) {
    res
      .status(400)
      .json({ message: "Please, send all data to create a new challenge!" });
    return;
  }

  try {
    async function writeData(forumCollection) {
      await forumCollection.insertOne({
        title: title,
        body: body,
        image: image,
        publisher: email,
        date: new Date(),
        interaction: {
          likes: [],
          comments: [],
        },
      });
    }

    await dbConnection(writeData, "forum");

    res.status(201).json({ message: "Creating the challenge is done!" });
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Deleting challenge function:
export async function deleteChallenge(req, res) {
  const id = req.params.id;

  try {
    async function deleteData(forumCollection) {
      await forumCollection.deleteOne({ _id: ObjectId(id) });

      res.status(200).json({ message: "Deleting the challenge is done!" });
    }

    await dbConnection(deleteData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Finding challenge by id:
export async function findChallengeById(req, res) {
  const id = req.params.id;

  try {
    async function readData(forumCollection) {
      const challenge = await forumCollection.findOne({ _id: ObjectId(id) });

      if (challenge) {
        res.status(200).json(challenge);
      } else {
        res
          .status(404)
          .json({ message: "Sorry, can not find challenge by this id!" });
      }
    }
    await dbConnection(readData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Updating challenge function:
export async function updateChallenge(req, res) {
  const { title, body, image } = req.body;
  const id = req.params.id;

  if (!title || !body) {
    res.status(400).json({ message: "Please, send the title and the body." });
  }

  try {
    async function updateData(forumCollection) {
      await forumCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { title, body, image } }
      );

      res.status(201).json({ message: "Updating the challenge is done!" });
    }

    await dbConnection(updateData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Finding challenge by title:
export async function findChallengeByTitle(req, res) {
  const title = req.query.title;

  try {
    async function readData(forumCollection) {
      const pipeline = [
        {
          $match: {
            title: new RegExp(".*" + title + ".*"),
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
        {
          $limit: 100,
        },
      ];

      const aggCursor = forumCollection.aggregate(pipeline);

      const aggResult = await aggCursor.toArray();

      if (aggResult.length >= 1) {
        res.json(aggResult);
      } else {
        res.status(404).json({
          message: "Sorry, can not find any challenge by this title!",
        });
      }
    }
    await dbConnection(readData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Adding like function:
export async function editLike(req, res) {
  const id = req.params.id;
  const like = req.body;

  try {
    async function updateData(forumCollection) {
      if (like.action === "add") {
        await forumCollection.updateOne(
          { _id: ObjectId(id) },
          { $push: { "interaction.likes": like.user } }
        );
        res.status(201).json({ message: "Adding like is done!" });
      } else if (like.action === "delete") {
        await forumCollection.updateOne(
          { _id: ObjectId(id) },
          { $pull: { "interaction.likes": like.user } }
        );
        res.status(201).json({ message: "Deleting like is done!" });
      }
    }

    await dbConnection(updateData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************

// Adding comment function:
export async function editComment(req, res) {
  const id = req.params.id;
  const { commentId, user, text, action } = req.body;

  try {
    async function updateData(forumCollection) {
      if (action === "add") {
        await forumCollection.updateOne(
          { _id: ObjectId(id) },
          { $push: { "interaction.comments": { id: uuid(), user, text } } }
        );
        res.status(201).json({ message: "Adding comment is done!" });
      } else if (action === "delete") {
        await forumCollection.updateOne(
          { _id: ObjectId(id) },
          {
            $pull: { "interaction.comments": { id: commentId } },
          }
        );
        res.status(201).json({ message: "Deleting comment is done!" });
      }
    }

    await dbConnection(updateData, "forum");
  } catch (error) {
    console.log(error);
    errorMessage(res);
  }
}

//**********************************************************************
