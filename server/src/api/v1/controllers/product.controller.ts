import { Request, Response } from 'express';
import { createProduct, deleteProduct, findProduct, updateProduct } from '../services/product.service';
import { createProductInput, updateProductInput } from '../validations/product.validation';

export const createProductHandler = async (req: Request<{}, {}, createProductInput['body']>, res: Response) => {
    try {
        const { body } = req;
        const userId = res.locals.user._id;

        const product = await createProduct({ ...body, user: userId }) // call product service

        return res.send({ status: "OK", data: product });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

export const findProductHandler = async (req: Request<updateProductInput["params"]>, res: Response) => {
    //! Hey guys you should pay attention here.
    const { params: { productId } } = req;

    if (!productId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Paramater: productId can not be empty" }
        })
    }
    try {
        const product = await findProduct({ productId }); // call product service

        return res.send({ status: "OK", data: product });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

export const updateProductHandler = async (req: Request<updateProductInput["params"]>, res: Response) => {
    const { params: { productId }, body } = req;
    const userId = res.locals.user._id;

    if (productId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Paramater : productId can not be empty" }
        })
    }
    try {
        const updatedProduct = await updateProduct({ productId }, body, { new: true });

        return res.send({
            status: "OK",
            data: updatedProduct
        });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

export const deleteProductHandler = async (req: Request, res: Response) => {
    const { params: { productId } } = req;
    const userId = res.locals.user._id;

    if (!productId) {
        return res.status(400).send({
            status: "OK",
            data: { error: "Paramater :productId can not be empty" }
        })
    }
    try {
        await deleteProduct({ productId });

        return res.status(204).send({ status: "OK" });
    } catch (error: any) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}