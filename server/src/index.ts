import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const { APP_PORT } = process.env;

const app: Express = express();

const PORT = APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
