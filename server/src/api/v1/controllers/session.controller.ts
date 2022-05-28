import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSession, updateSession } from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
export const createSessionHandler = async (req: Request, res: Response) => {
    try {
        // validate the user's password
        const user = await validatePassword(req.body);

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // create a session
        const session = await createSession(user._id, req.get("user-agent") || "");

        console.log("session -> ", session);

        // create an access token
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("app.accessTokenTtl") } // 15 minutes
        )

        console.log("accessToken -> ", accessToken);

        // create a refresh token
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("app.refreshTokenTtl") } // 1 year
        )

        // return access && refresh tokens
        res.cookie("accessToken", accessToken, {
            maxAge: 900000,//15 mins
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: false
        })

        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10,//1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: false
        })

        return res.send({ accessToken, refreshToken })
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
};

export const getSessionHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;

        const sessions = await findSession({ user: userId, valid: true })

        return res.status(200).send(sessions)
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

export const deleteSessionHandler = async (req: Request, res: Response) => {
    try {
        const sessionId = await res.locals.user.session;

        console.log(sessionId);

        await updateSession({ _id: sessionId }, { valid: false });

        return res.status(200).send({
            accessToken: null,
            refreshToken: null
        })
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}