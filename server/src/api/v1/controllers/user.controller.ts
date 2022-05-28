import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, deleteUser, findUser, updateUser } from '../services/user.service';
import log from '../utils/logger';
import { CreateUserInput } from '../validations/user.validation';

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const { body } = req;

        const user = await createUser({ ...body })  // call user service

        return res.send({ status: "OK", data: omit(user, "password") });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        });
    }
};

export const findUserHandler = async (req: Request, res: Response) => {
    try {
        console.log(process.env.PUBLIC_KEY)

        return res.send({ status: "OK", data: res.locals.user });
    } catch (error: any) {
        return res.status(error?.status).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { body } = req;

    try {
        const user = await findUser({ _id: userId });

        if (!user) {
            return res.status(404).send({
                status: "FAILED",
                data: { error: "User not found" }
            });
        }

        const updatedUser = await updateUser({ _id: userId }, body, { new: true })

        return res.send({
            status: "OK",
            data: updatedUser
        });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        });
    }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    try {
        const user = await findUser({ _id: userId });

        if (!user) {
            return res.status(404).send({
                status: "FAILED",
                data: { error: "User Not Found" }
            });
        }

        await deleteUser({ _id: userId });

        return res.send({ status: "OK" })
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}