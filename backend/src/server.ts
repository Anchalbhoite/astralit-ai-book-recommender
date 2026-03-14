import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/books";
import chatRoutes from "./routes/chatRoutes";
import {Book} from "./models/Book";   

const app = express();
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/chat", chatRoutes);

// Featured Books Route
app.get("/api/books/featured", async (req, res) => {
  try {
    const books = await Book.find({ trending: true }).limit(10);
    res.json(books);
  } catch (error) {
    console.error("Error loading featured books:", error);
    res.status(500).json({ error: "Failed to load featured books" });
  }
});

// DB + Server
mongoose
  .connect("mongodb://127.0.0.1:27017/astralit")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(4000, () => console.log("Server running on port 4000"));
  })
  .catch(err => console.log(err));
