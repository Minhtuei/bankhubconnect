import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectRouter from "./routes/connect";
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(connectRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
