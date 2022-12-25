import express from "express";
import cors from "cors";
import functions from "firebase-functions";
import "dotenv/config";
import { posts } from "./src/mongoConnect.js";
import { addPost } from "./src/posts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hooray, it works!");
});

app.post("/posts", addPost);

app.get("/posts", async (req, res) => {
  const allPosts = await posts.find().toArray();
  res.send(allPosts);
});

export const api = functions.https.onRequest(app);
