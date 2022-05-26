import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument } from '../models/user.model';
import log from '../utils/logger';

export const createUser = async (input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) => {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
    try {
        const user = await UserModel.findOne(query).lean();

        if (!user) {
            throw {
                status: 400,
                message: `Can't find user with the id ${query}`
            }
        }
        return user;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const updateUser = async (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) => {
    try {
        const user = await UserModel.findOneAndUpdate(query, update, options);

        if (!user) {
            throw {
                status: 400,
                message: `Can't user find the id ${query}`
            }
        }
        return user;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
    try {
        const user = await UserModel.deleteOne(query);

        if (!user) {
            throw {
                status: 400,
                message: `Can't find user the id ${query}`
            }
        }
        return user;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const validatePassword = async ({ email, password }: { email: string, password: string }) => {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return false
        } else {
            const isValid = await user.comparePassword(password);

            if (!isValid) return false;

            return omit(user.toJSON(), "password");
        }
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}
