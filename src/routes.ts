import { Express, Request, Response } from 'express'
import { createUserHandler } from './api/v1/controllers/user.controller';
import { validate } from './api/v1/middlewares/validateResource';
import { createUserValidation } from './api/v1/validations/user.validation';

const routes = (app: Express) => {
    app.get("/", (req: Request, res: Response) => {
        res.sendStatus(200)
    });

    app.post("/api/users", validate(createUserValidation), createUserHandler)
}

export default routes;