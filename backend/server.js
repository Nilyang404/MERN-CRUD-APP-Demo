import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./lib/connectToDB.js";
import { Note } from "./models/notes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();
// Connect to MongoDB

app.get("/", (req, res) => {
  res.send("{ message: 'Hello World' }");
});

// Create a new note
app.post("/note", async (req, res) => {
  const { title, author, body } = req.body;
  const Note = mongoose.model("Note");
  const note = new Note({
    title,
    author,
    body,
  });
  try {
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a set of note
app.get("/allnotes", async (req, res) => {
  try {
    const notes = await Note.find();
    // res.send(notes);
    if (!notes) {
      res.status(404).send("Note not found");
    } else {
      res.status(200).json({ notes: notes });
    }
  } catch (error) {
    res.status(500).send;
  }
});

// get a single note
app.get("/note/:id", async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;
  try {
    const note = await Note.findById(id);
    if (!note) {
      res.status(404).send("Note not found");
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// get by page and pagesize
// /post?page=2&pageSize=5

app.get("/notes", async (req, res) => {
  //user query string to get page and pageSize
  const page = parseInt(req.query.page) || 1;
  // the
  const pageSize = parseInt(req.query.pagesize) || 10;

  // calculate the number of documents to skip
  const skip = (page - 1) * pageSize;

  try {
    // get the x notes form page y
    const note = await Note.find().skip(skip).limit(pageSize);
    if (!note) {
      res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update a note by id
// /note/your_id
app.put("/note/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, body } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, author, body },
      { new: true }
    );
    if (!note) {
      res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// patch a note by id

app.patch("/note/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, body } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, author, body },
      { new: true }
    );
    if (!note) {
      res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete a note by id
app.delete("/note/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// always at the end
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
