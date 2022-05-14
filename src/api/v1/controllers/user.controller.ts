import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import log from '../utils/logger';
import { CreateUserInput } from '../validations/user.validation';

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)  // call user service
        return res.status(200).send(user);
    } catch (error: any) {
        log.error(error);
        return res.status(409).send(error.message);
    }
};