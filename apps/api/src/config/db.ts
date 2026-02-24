import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URI || "");
        console.log("connect ho gya db")

    } catch(error){
        console.error("failed connection with db", error)
        process.exit(1);
    }
}