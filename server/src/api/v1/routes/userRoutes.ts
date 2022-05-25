import { Express, Request, Response } from 'express';
import { createSessionHandler, deleteSessionHandler, getSessionHandler } from '../controllers/session.controller';
import { createUserHandler, findUserHandler } from '../controllers/user.controller';
import { createSessionValidation } from '../validations/session.validation';
import { createUserValidation } from '../validations/user.validation';
import { requireUser } from '../middlewares/requireUser';
import { validate } from '../middlewares/validateResource';


const userRoutes = (app: Express) => {
    app.get("/api/v1/me", requireUser, findUserHandler)

    /**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

    /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *      - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *             type: array
     *             items: 
     *               $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      '200':
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      '409':
     *        description: Conflict
     *      '400':
     *        description: Bad request
     */
    app.post("/api/v1/users", validate(createUserValidation), createUserHandler)
    app.post("/api/sessions", validate(createSessionValidation), createSessionHandler)
    app.get("/api/sessions", requireUser, getSessionHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)
}

export default userRoutes;