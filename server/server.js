import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = ['https://authix-one.vercel.app/']

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.send("Hello ji kya haal");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => console.log(`Server started on port:${port}`));
