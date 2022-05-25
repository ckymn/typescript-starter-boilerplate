import config from "config";
import dotenv from "dotenv";
dotenv.config();
import connect from "./v1/utils/connects";
import log from "./v1/utils/logger";
import routes from "./v1/routes/index";
import { createServer } from './v1/utils/server';
import swagger from './v1/utils/swagger';

const port = config.get("app.port") as number;
const host = config.get("db.host") as string;

const app = createServer();

app.listen(port, host, async () => {
    log.info(`Server listining at http://${host}:${port}`);

    await connect()

    routes(app);

    swagger(app, port);
});
