export default {
    app: {
        port: 1337,
        saltWorkFactor: 10,
        accessTokenTtl: "15m",
        refreshTokenTtl: "1y",
        publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAst3t90vMeEJBrsmS3Tjd
Mbuir73jQJoZ5eqlmAcvxaGd+ApCpdymn7WkOD9oy8822BBHJwxPKUmjrjkosem2
SzjzeQpuuXyAM15iDp/U9uPKj2cOR+OLg1+ZR76oUgXLpS7ouhB50h3oAkG887Yv
sBJCHIMFd6XPOWIkDxLyI6l/mZaM385k7/tyxtKK8pAt8UIj3hH7oCjAg1qSynP/
oV39Xg2Q5H+6Q7XiJqs/tKRJFgAkuc6BY5W3LU/qKnsvDG06hReSds/oT8E6jqg+
qFNwlqyRNhrvJzFeHpAK/EA9n5cInn63Q4KPlnt3b9d+UBjiSdB9qZCgVWVzfkqF
KwIDAQAB
-----END PUBLIC KEY-----`,
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAst3t90vMeEJBrsmS3TjdMbuir73jQJoZ5eqlmAcvxaGd+ApC
pdymn7WkOD9oy8822BBHJwxPKUmjrjkosem2SzjzeQpuuXyAM15iDp/U9uPKj2cO
R+OLg1+ZR76oUgXLpS7ouhB50h3oAkG887YvsBJCHIMFd6XPOWIkDxLyI6l/mZaM
385k7/tyxtKK8pAt8UIj3hH7oCjAg1qSynP/oV39Xg2Q5H+6Q7XiJqs/tKRJFgAk
uc6BY5W3LU/qKnsvDG06hReSds/oT8E6jqg+qFNwlqyRNhrvJzFeHpAK/EA9n5cI
nn63Q4KPlnt3b9d+UBjiSdB9qZCgVWVzfkqFKwIDAQABAoIBAF3yPujiwRRxCHq7
mQ3krhlPClXwEIp/5hZitnMxYyAUkRoUmYjwafv8tbJta6eQwKefdR/HUVTIPtZl
Y0B/FqZP1WG/3wRBpjxU2IAB5yN95YiIgnGzzDVGYwXR2CqsrJeoGciQmsuHtbJp
wMro6Ac8r8i18Is1ZbAoIfRg6RldLqJ2m/NdQJ8JXsl3vuUz5U7t9LdnFaXLQFkg
BFnDDEO5AgndwjuH+EMoBzFAyH2HxEk/AsDPQHXcK7hUvuzB6vk37crprCYvMHnj
Kw6pdW1yU86B4hub1x6chYoE8A9Rj70ka4gNE0GYby28L+03/wS6yYdMYj7yUE1P
Pd6VxZECgYEA3XrkVdcN+Ro5clQZDPi8168sl7QMzcrul4ln5ucmyaq2PAUUDRAx
IH8mMgzyJImU2lvJoxRvUazSerFNzbnWnXaFgtudMDJgNzpj5mH9dWg3EmdvN6Qq
D78o9GpEXtvLCRjqTvd2u5LA+1TXCgJm2D2tQDp+h3HYONgC9aktk5UCgYEAzr7D
XKLp8zuWMtIjf3TMswHv6xxpbGMmc1/VY1VJgcWH/FjXoXqZY8Qc5qoXojV0l+gT
SMiBMbqBmXlm3BFxD7IOKOSjAyXYT99b5NPR1IxQLioUonUddcvPzPDjuxadKhB0
DKlzf8S4O3xioGBG5SIZa99Z+3z0orEir/Hphb8CgYAcF++It+us0lfBGcvHqnGB
xlWYtJz/KaOUEzjbwCxaXk4ZVOeTNJ+WqKo2pQ+99Lmt7QCpr/ji2lIkgAMHenAv
rw4GaEcLCwjLWJu9aGaXEu4RZo9j9m3ja3MNdcFQav7ZG5D1DUzBRD84Yi2Ytm9H
NKOaRxEvqxArPbM6aAhA9QKBgQDOD4RYSGg1biZ98MRAvQFpSXz/MQpCZXBlfhcJ
MnBZT7AB6+q/n5pSvZywqsdzfSQAY+cUnANotSOG/GFw5lFx+13xlDCFaqr2sQC+
SgDRgChKWtbGNURvq/wpn87bIebzjgKcvCfKKSAW6hrDDjKbHimIQs1Ew35wyWxx
QQQnsQKBgA/YbHGc0mWyY/d4uoAk5IMtMEP5juEF7oTj2OfUjqMI+RjbC48gg97u
Tso84tZdf+H5DOXvK4jOFYZ8kLEprRF2hLH1Oc8L2bM4vuVqngrzgAUIrwqQohyn
Y/Zil2RBYrgGJ2Ep8xHX7C+Qc1D1YnEO0cXHl72AjJ0ssu4STj+n
-----END RSA PRIVATE KEY-----`,
    },
    db: {
        host: "localhost",
        name: "build-restapi-with-typescript",
        dbUri: `mongodb+srv://ckymn:ckymn123.@cluster0.fzenv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    }
}