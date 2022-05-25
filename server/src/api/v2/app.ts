
import config from "config";
dotenv.config();
import express from 'express';
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`The server is running ${PORT}`)
});
