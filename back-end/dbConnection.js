import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

async function dbConnection(crudFunction, collection) {
  const client = new MongoClient(process.env.MONGODB_URL);
  const usersCollection = client.db("genius-forum").collection("users");
  const forumCollection = client.db("genius-forum").collection("forum");
  let useCollection = "";

  if (collection === "user") {
    useCollection = usersCollection;
  } else if (collection === "forum") {
    useCollection = forumCollection;
  }

  try {
    await client.connect();
    await crudFunction(useCollection);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export default dbConnection;
