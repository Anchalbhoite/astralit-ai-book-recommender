import mongoose from "mongoose";
import { Book } from "../src/models/Book";
import { allBooks } from "./mockdata";


const runSeed = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/astralit");

    console.log("Connected to MongoDB");

    await Book.deleteMany({});
    console.log("Old books removed");

    await Book.insertMany(allBooks);
    console.log("Mock books inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();
