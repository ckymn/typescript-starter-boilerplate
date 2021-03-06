import { Express, Request, Response } from 'express'
import { createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from '../controllers/product.controller';
import { requireUser } from '../middlewares/requireUser';
import { validate } from '../middlewares/validateResource';
import { createProductValidation, deleteProductValidation, findProductValidation, updateProductValidation } from '../validations/product.validation';


const productRoutes = (app: Express) => {
    /**
   * @openapi
   * /home:
   *  get:
   *     tags:
   *        - Home
   *     summary: Home page
   *     description: Respons if the app is up and running
   *     responses:
   *       200:
   *         description: OK
   *         content: 
   *            application/json:
   *              schema:
   *                type: object
   *                properties: 
   *                  status: 
   *                    type: string
   *                    example: OK
   *                  data: 
   *                    type: array
   *       5XX:
   *         description: FAILED
   *         content: 
   *            application/json:
   *              schema:
   *                type: object
   *                properties:     
   *                   status:
   *                     type: string
   *                     example: FAILED
   *                   data: 
   *                     type: string
   *                     example: "Some error message"
   */
    app.get("/api/v1/home", (req: Request, res: Response) => { res.sendStatus(200) });

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
    app.post("/api/v1/products", [requireUser, validate(createProductValidation)], createProductHandler);
    app.put("/api/v1/products/:productId", [requireUser, validate(updateProductValidation)], updateProductHandler);
    app.get("/api/v1/products/:productId", validate(findProductValidation), findProductHandler);
    app.delete("/api/v1/products/:productId", [requireUser, validate(deleteProductValidation)], deleteProductHandler);

}

export default productRoutes;