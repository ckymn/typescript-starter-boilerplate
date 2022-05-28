import jwt from 'jsonwebtoken';

const privateKey = String(process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'))
const publicKey = String(process.env.PUBLIC_KEY?.replace(/\\n/g, '\n'))


export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}