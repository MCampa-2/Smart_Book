import express from "express";
import { createBook,getAllBooks,getSingleBook,deleteBook,updateBook,getUserBooks } from "../Controllers/book.js";
import { authenticate } from "../Middleware/authenticaion.js";
const router = express.Router();

router.get("/", getAllBooks);

router.use(authenticate)
router.get("/user", getUserBooks);
router.post("/",createBook);
router.get("/:id", getSingleBook);
router.delete("/:id", deleteBook);
router.patch("/user/:id", updateBook);

export default router;

