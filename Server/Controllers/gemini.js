import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const geminiResponse = async (req, res) => {
    try {
        // Assuming the client sends a {search: "some question"}
        const { search } = req.body; // Extract search or prompt field

        if (!search) {
            return res.status(400).json({ msg: "Missing prompt (search) in request body" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Generate content with the extracted search prompt
        const result = await model.generateContent(search);

        if (!result) {
            console.log("no response");
            return res.status(400).json({ msg: "Could not get gemini response" });
        }

        console.log(result);
        return res.status(200).json({ "Answer": result.response.text() });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message || "Internal server error" });
    }
};



