import { Request, Response } from "express";
import { Book } from "../models/Book";

export const addBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Book added", book });
    } catch (error) {
        res.status(500).json({ error: "Failed to add book" });
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
};
