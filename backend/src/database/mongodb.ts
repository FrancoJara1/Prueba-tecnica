import { MongoClient } from "mongodb";
import { env } from "../config/env";

const client = new MongoClient(env.MONGODB_URI);

export const db = client.db("article-manager");

export async function connectDB() {
  try {
    await client.connect();

    console.log("✅ MongoDB conectado");

    await db.collection("articles").createIndex({
      title: 1
    });

    await db.collection("articles").createIndex({
      createdAt: -1
    });

  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
}