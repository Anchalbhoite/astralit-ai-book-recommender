import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import bookRoutes from "./routes/books";
import chatRoutes from "./routes/chatRoutes";
import { Book } from "./models/Book";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));

// middleware
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);
app.use("/api/chat", chatRoutes);

// featured books route
app.get("/api/books/featured", async (req, res) => {
  try {
    const books = await Book.find({ trending: true }).limit(10);
    res.json(books);
  } catch (error) {
    console.error("Error loading featured books:", error);
    res.status(500).json({ error: "Failed to load featured books" });
  }
});

// start server
const startServer = async () => {
  await connectDB();

  app.listen(4000, () => {
    console.log("🚀 Server running on port 4000");
  });
};

startServer();
