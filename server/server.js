import express, { json } from 'express';
import cors from "cors";
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const app = express();

const dbURL = "mongodb+srv://dudes01:7LZQjgVx3dPKoxkh@cluster0.oms8qj2.mongodb.net/?retryWrites=true&w=majority"; //Make sure your DB is available to any IP just like HW5.
const client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
let db = client.db("databaseproject");

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    let collection = await db.collection("artists");
      let result = await collection.insertOne(req.body);
      res.status(201).json({ message: 'Artists uploaded successfully' });
  } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
  }
});

app.get("/searchs/:name", async (req, res) => {
  let collection = await db.collection("artists");
  let result = await collection.find({name: req.params.name}).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});