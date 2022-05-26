import { FilterQuery, UpdateQuery, DocumentDefinition, QueryOptions } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model'

export const createProduct = async (input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt" | "productId">>) => {
    try {
        const product = await ProductModel.create(input);

        return product;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const findProduct = async (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
    try {
        const product = await ProductModel.findOne(query, {}, options);

        if (!product) {
            throw {
                status: 400,
                message: `Can't find product with the id ${query}`
            }
        }
        return product;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.messaage || error
        }
    }
}

export const updateProduct = async (query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) => {
    try {
        const product = await ProductModel.findOneAndUpdate(query, update, options);

        if (!product) {
            throw {
                status: 400,
                message: `Can't find product with the id ${query}`
            }
        }
        return product;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
    try {
        const product = await ProductModel.deleteOne(query);

        if (!product) {
            throw {
                status: 400,
                message: `Can't find product the id ${query}`
            }
        }
        return product;
    } catch (error: any) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

