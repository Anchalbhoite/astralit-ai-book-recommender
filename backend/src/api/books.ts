import API from "./axios";

export const getAllBooks = () => API.get("/books");

export const getBookById = (id: string) => API.get(`/books/${id}`);
