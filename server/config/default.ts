export default {
    app: {
        port: 1337,
        origin: "http://localhost:3000",
        saltWorkFactor: 0,
        accessTokenTtl: "15m",
        refreshTokenTtl: "1y",
        publicKey: ``,
        privateKey: ``,
    },
    db: {
        host: "localhost",
        name: "build-restapi-with-typescript",
        dbUri: "mongodb://localhost:27017/build-restapi-with-typescript",
    }
}