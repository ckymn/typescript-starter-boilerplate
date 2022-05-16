import { Request, Response } from 'express';
import { createProduct, deleteProduct, findProduct, updateProduct } from '../services/product.service';
import log from '../utils/logger';
import { createProductInput, updateProductInput } from '../validations/product.validation';

export const createProductHandler = async (req: Request<{}, {}, createProductInput['body']>, res: Response) => {
    try {
        const { body } = req;
        const userId = res.locals.user._id;

        const product = await createProduct({ ...body, user: userId }) // call product service

        return res.status(200).send(product);
    } catch (error: any) {
        log.error(error);
        return res.status(400).send(error.message)
    }
}

export const findProductHandler = async (req: Request<updateProductInput['params'], {}, updateProductInput['body']>, res: Response) => {
    try {
        const { productId } = req.params

        const product = await findProduct({ productId }); // call product service

        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }

        return res.status(200).send(product);
    } catch (error: any) {
        log.error(error);
        return res.status(400).send(error.message)
    }
}

export const updateProductHandler = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const userId = res.locals.user._id;
        const { body } = req

        const product = await findProduct({ productId }); // call product service

        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }
        if (product.user !== userId) {
            return res.status(404).send({ message: "Product dont match own user" })
        }

        const updatedProduct = await updateProduct({ productId }, body, { new: true });

        return res.status(200).send(updatedProduct);
    } catch (error: any) {
        log.error(error);
        return res.status(400).send(error.message)
    }
}

export const deleteProductHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;

        const product = await findProduct({ productId });

        if (!product) {
            return res.status(404).send({ message: "Product Not Found" });
        }

        if (String(product.user) !== userId) {
            return res.status(403).send({ message: "Product dont match of own product" });
        }

        await deleteProduct({ productId });

        return res.status(200).send({ message: "Product deleted" });
    } catch (error: any) {
        log.error(error);
        return res.status(400).send(error.message)
    }
}