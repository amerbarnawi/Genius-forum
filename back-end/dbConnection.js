import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

async function dbConnection(crudFunction, collection) {
  const client = new MongoClient(process.env.MONGODB_URL);
  const usersCollection = client.db("genius-forum").collection("users");
  const forumCollection = client.db("genius-forum").collection("forum");
  const chatCollection = client.db("genius-forum").collection("chat");
  const onlineCollection = client.db("genius-forum").collection("online");

  let useCollection = "";

  if (collection === "user") {
    useCollection = usersCollection;
  } else if (collection === "forum") {
    useCollection = forumCollection;
  } else if (collection === "chat") {
    useCollection = chatCollection;
  } else if (collection === "online") {
    useCollection = onlineCollection;
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
