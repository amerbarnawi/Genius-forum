import { ObjectId } from "mongodb";
import dbConnection from "../dbConnection.js";

export function errorMessage(res) {
  return res
    .status(500)
    .json({ message: "Something went wrong, please try later!" });
}

// Getting a challenge by Id:
// export async function findChallenge(req, res) {
//   const id = req.params.id;

//   async function readData(forumCollection) {
//     const result = await forumCollection.findOne({ _id: ObjectId(id) });

//     if (result) {
//       return result;
//     } else {
//       res
//         .status(404)
//         .json({ message: "Sorry, can not find challenge by this id!" });
//     }
//   }
//   await dbConnection(readData, "forum");
// }
