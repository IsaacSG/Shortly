import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Routes/authRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(authRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server listen from ${port}`));