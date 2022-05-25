import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, deleteUser, findUser, updateUser } from '../services/user.service';
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

export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        const { body } = req;

        const user = await findUser({ _id: userId });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const updatedUser = await updateUser({ _id: userId }, body, { new: true })

        return res.status(200).send(updatedUser);
    } catch (error: any) {
        log.error(error);
        return res.status(400).send(error.message);
    }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;

        const user = await findUser({ _id: userId });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        await deleteUser({ _id: userId });

        return res.status(200).send({ message: "User deleted" })
    } catch (error: any) {
        log.error(error)
        return res.status(400).send(error.message);
    }
}