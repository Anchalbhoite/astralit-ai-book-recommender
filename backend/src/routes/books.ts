import { Router } from "express";
import { addBook, getBooks } from "../controllers/booksController";

const router = Router();

router.post("/", addBook);
router.get("/", getBooks);

export default router;
