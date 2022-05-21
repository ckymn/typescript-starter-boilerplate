import config from "config";
import dotenv from "dotenv";
dotenv.config();
import connect from "./api/v1/utils/connects";
import log from "./api/v1/utils/logger";
import routes from "./routes";
import { createServer } from './api/v1/utils/server';
import cors from 'cors';

const port = config.get("app.port") as number;
const host = config.get("db.host") as string;

const app = createServer();
app.use(cors({
    origin: config.get('app.origin'),
    credentials: true
}));

app.listen(port, host, async () => {
    log.info(`Server listining at http://${host}:${port}`);

    await connect()

    routes(app);
});
