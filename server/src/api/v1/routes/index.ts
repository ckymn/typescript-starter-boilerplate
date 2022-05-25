import User from './userRoutes';
import Product from './productRoutes'
import { Express } from 'express';

const routes = (app: Express) => {
    User(app);
    Product(app);
}

export default routes