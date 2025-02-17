import mongoose from "mongoose";
const {Schema} = mongoose;

export const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['Fiction', 'Non-Fiction', 'Fantasy', 'Mystery', 'Science Fiction'],
    },
    description: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    review: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User",
        required: true
    }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;