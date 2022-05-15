import express from 'express';
import config from 'config';
import dotenv from 'dotenv';
import connect from './api/v1/utils/connects';
import log from './api/v1/utils/logger';
import routes from './routes';
// import { deserializeUser } from './middleware';

const app = express();
dotenv.config();
const port = config.get("app.port") as number;
const host = config.get("db.host") as string;

// app.use(deserializeUser()):
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, async () => {
    log.info(`Server listining at http://${host}:${port}`);

    await connect()

    routes(app);
})