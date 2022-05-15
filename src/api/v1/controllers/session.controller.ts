import { Request, Response } from 'express';
import config from 'config';
import { createSession } from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import log from '../utils/logger';

export const createSessionHandler = async (req: Request, res: Response) => {
    try {
        // validate the user's password
        const user = await validatePassword(req.body);

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // create a session
        const session = await createSession(user._id, req.get("user-agent") || "");

        // create an access token
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("app.accessTokenTtl") } // 15 minutes
        )

        // create a refresh token
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("app.refreshTokenTtl") } // 1 year
        )
        // return access && refresh tokens

        return res.send({ accessToken, refreshToken })
    } catch (error: any) {
        log.error(error);
        return res.status(409).send(error.message);
    }
};