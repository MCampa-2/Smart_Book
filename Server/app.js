import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./Routes/book.js";
import authRoutes from "./Routes/auth.js";
import geminiRoute from "./Routes/gemini.js";



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/gemini", geminiRoute);




const PORT = process.env.PORT || 4000; 



const connectDb = async (req,res) =>{
    try{
        await mongoose.connect(process.env.CONNECTION_URI);
        console.log("Connected to db");
        app.listen(PORT, () =>{
            console.log(`Server on port ${PORT}`);
        });

    }catch(error){
        console.log(error.message);
    }
};

connectDb();