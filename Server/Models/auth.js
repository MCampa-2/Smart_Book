import mongoose from "mongoose";
const {Schema} = mongoose;

export const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model("User", authSchema);

export default User;
