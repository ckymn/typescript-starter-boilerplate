import { Express, Request, Response } from 'express'
import { createSessionHandler, getSessionHandler } from './api/v1/controllers/session.controller';
import { createUserHandler } from './api/v1/controllers/user.controller';
import { requireUser } from './api/v1/middlewares/requireUser';
import { validate } from './api/v1/middlewares/validateResource';
import { createSessionValidation } from './api/v1/validations/session.validation';
import { createUserValidation } from './api/v1/validations/user.validation';

const routes = (app: Express) => {
    app.get("/", (req: Request, res: Response) => {
        res.sendStatus(200)
    });

    app.post("/api/users", validate(createUserValidation), createUserHandler)
    app.post("/api/sessions", validate(createSessionValidation), createSessionHandler)
    app.get("/api/sessions", requireUser, getSessionHandler)

}

export default routes;