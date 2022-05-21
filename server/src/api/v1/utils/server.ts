import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";

export const createServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(deserializeUser);

    return app
}