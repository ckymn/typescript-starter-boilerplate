import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, findUser } from '../services/user.service';
import log from '../utils/logger';
import { CreateUserInput } from '../validations/user.validation';

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)  // call user service
        if (!user) {
            return res.status(200).send({ statusCode: 409, message: "User Already Exist! . Try Again" })
        } else {
            return res.status(200).send(omit(user, "password"));
        }
    } catch (error: any) {
        log.error(error);
        return res.status(409).send(error.message);
    }
};

export const findUserHandler = async (req: Request, res: Response) => {
    return res.send(res.locals.user);
}