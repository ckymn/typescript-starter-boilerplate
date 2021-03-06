import { Express, Request, Response } from 'express';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../../package.json';
import log from './logger';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            version,
            title: "TYPESCRIPT STARTER BOILERPLATE",
            description: "Express with Typescript Library API"
        },
        servers: [
            {
                url: "http://localhost:1337"
            }
        ],
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        seurity: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["./src/routes.ts", "./src/validations/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options);


function swaggerDocs(app: Express, port: number) {
    // Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    log.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs