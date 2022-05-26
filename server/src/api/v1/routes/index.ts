import User from './userRoutes';
import Product from './productRoutes'
import { Express } from 'express';
import apicache from 'apicache';

const cache = apicache.middleware;

const routes = (app: Express) => {

    app.use(cache("2 minutes"))

    User(app);
    Product(app);
}

export default routes