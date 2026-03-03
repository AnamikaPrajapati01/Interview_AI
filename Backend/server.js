import express from "express";
import { config } from "dotenv";
import connectToDB from "./src/config/database.js"
import authRouter from "./src/routes/auth.routes.js"; // ✅ FIXED
import cookieParser from "cookie-parser";

config();
connectToDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});