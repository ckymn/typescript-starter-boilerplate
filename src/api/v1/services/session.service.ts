import config from 'config';
import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export const findSession = async (query: FilterQuery<SessionDocument>) => {
    const sessions = await SessionModel.find(query).lean();

    return sessions;
}

export const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
    const session = await SessionModel.updateOne(query, update);

    return session;
}

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("app.accessTokenTtl") } // 15 minutes
    );

    return accessToken;

}