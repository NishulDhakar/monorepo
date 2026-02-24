import cookieParser from "cookie-parser";
import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(express.json())

app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/auth" , authRoutes);

export default app;