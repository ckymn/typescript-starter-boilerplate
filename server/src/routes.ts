import { Express, Request, Response } from 'express'
import { createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from './api/v1/controllers/product.controller';
import { createSessionHandler, deleteSessionHandler, getSessionHandler } from './api/v1/controllers/session.controller';
import { createUserHandler, findUserHandler } from './api/v1/controllers/user.controller';
import { requireUser } from './api/v1/middlewares/requireUser';
import { validate } from './api/v1/middlewares/validateResource';
import { createProductValidation, deleteProductValidation, findProductValidation, updateProductValidation } from './api/v1/validations/product.validation';
import { createSessionValidation } from './api/v1/validations/session.validation';
import { createUserValidation } from './api/v1/validations/user.validation';

const routes = (app: Express) => {
    /**
   * @openapi
   * /home:
   *  get:
   *     tags:
   *        - Home
   *     summary: Home page
   *     description: Respons if the app is up and running
   *     responses:
   *       '200':
   *         description: App is up and running
   */
    app.get("/home", (req: Request, res: Response) => { res.sendStatus(200) });
    app.get("/api/me", requireUser, findUserHandler)

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
    app.post("/api/users", validate(createUserValidation), createUserHandler)
    app.post("/api/sessions", validate(createSessionValidation), createSessionHandler)
    app.get("/api/sessions", requireUser, getSessionHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)
    app.post("/api/products", [requireUser, validate(createProductValidation)], createProductHandler);



    /**
     * @openapi
     * components:
     *   schemas:
     *     Product:
     *       type: object
     *       required:
     *        - title
     *        - description
     *        - price
     *        - image
     *       properties:
     *         title:
     *           type: string
     *           description: The title of product
     *         description:
     *           type: string
     *           description: The description of product
     *         price:
     *           type: number
     *           description: The price of product
     *         image:
     *           type: string
     *           description: The image path of porduct
     *       example: 
     *          id: d5fE_asz
     *          title: Pencil 
     *          description : The pencil is red
     *          price: 100$
     *          image: https://image.png
     */

    /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *    tags:
   *     - Products
   *    summary: Get a single product by the productId
   *    parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *    responses:
   *       '200':
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       '404':
   *         description: Product not found
   */
    app.put("/api/products/:productId", [requireUser, validate(updateProductValidation)], updateProductHandler);
    app.get("/api/products/:productId", validate(findProductValidation), findProductHandler);
    app.delete("/api/products/:productId", [requireUser, validate(deleteProductValidation)], deleteProductHandler);

}

export default routes;