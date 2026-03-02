import express from "express";
import { config } from "dotenv";
import connectToDB from "./src/config/database.js";

config(); 

connectToDB();

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});