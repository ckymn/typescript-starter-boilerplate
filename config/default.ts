export default {
    app: {
        port: 3000,
        saltWorkFactor: 10,
        accessTokenTtl: "15m",
        refreshTokenTtl: "1y",
        publicKey: ``,
        privateKey: ``,
    },
    db: {
        host: "localhost",
        name: "build-restapi-with-typescript",
        dbUri: `mongodb+srv://ckymn:ckymn123.@cluster0.fzenv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    }
}