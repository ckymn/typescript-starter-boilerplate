import config from 'config'
import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import cors from 'cors';

export const createServer = () => {
    const app = express();

    app.use(cors({
        origin: config.get("app.origin"),
        credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(deserializeUser);

    return app
}