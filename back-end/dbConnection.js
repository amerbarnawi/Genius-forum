import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

async function dbConnection(crudFunction) {
  const client = new MongoClient(process.env.MONGODB_URL);
  const usersCollection = client.db("genius-forum").collection("users");

  try {
    await client.connect();
    await crudFunction(usersCollection);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export default dbConnection;
