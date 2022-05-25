import config from "config";
import dotenv from "dotenv";
dotenv.config();
import connect from "./utils/connects";
import log from "./utils/logger";
import routes from "./routes/routes";
import { createServer } from './utils/server';
import swagger from './utils/swagger';

const port = config.get("app.port") as number;
const host = config.get("db.host") as string;

const app = createServer();

app.listen(port, host, async () => {
    log.info(`Server listining at http://${host}:${port}`);

    await connect()

    routes(app);

    swagger(app, port);
});
