import { FilterQuery, UpdateQuery, DocumentDefinition, QueryOptions } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model'

export const createProduct = async (input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt" | "productId">>) => {
    try {
        const product = await ProductModel.create(input);

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const findProduct = async (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
    try {
        const product = await ProductModel.findOne(query, {}, options);

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateProduct = async (query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) => {
    try {
        const product = await ProductModel.findOneAndUpdate(query, update, options);

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
    try {
        const product = await ProductModel.deleteOne(query);

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

function DocumentDefinition(input: string, DocumentDefinition: any) {
    throw new Error('Function not implemented.');
}

