import { Express, Request, Response } from 'express'
import { createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from './api/v1/controllers/product.controller';
import { createSessionHandler, deleteSessionHandler, getSessionHandler } from './api/v1/controllers/session.controller';
import { createUserHandler, findUserHandler } from './api/v1/controllers/user.controller';
import { requireUser } from './api/v1/middlewares/requireUser';
import { validate } from './api/v1/middlewares/validateResource';
import { createProductValidation, deleteProductValidation, findProductValidation, updateProductValidation } from './api/v1/validations/product.validation';
import { createSessionValidation } from './api/v1/validations/session.validation';
import { createUserValidation } from './api/v1/validations/user.validation';

const routes = (app: Express) => {
    app.get("/home", (req: Request, res: Response) => { res.sendStatus(200) });
    app.get("/api/me", requireUser, findUserHandler)
    app.post("/api/users", validate(createUserValidation), createUserHandler)
    app.post("/api/sessions", validate(createSessionValidation), createSessionHandler)
    app.get("/api/sessions", requireUser, getSessionHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)
    app.post("/api/products", [requireUser, validate(createProductValidation)], createProductHandler);
    app.put("/api/products/:productId", [requireUser, validate(updateProductValidation)], updateProductHandler);
    app.get("/api/products/:productId", validate(findProductValidation), findProductHandler);
    app.delete("/api/products/:productId", [requireUser, validate(deleteProductValidation)], deleteProductHandler);

}

export default routes;