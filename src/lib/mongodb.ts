import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/db_mytimsea";

if (!uri) {
  throw new Error("Please set your MongoDB URI in .env.local");
}


const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
