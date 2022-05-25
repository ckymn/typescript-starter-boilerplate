import { number, object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: "Title is requried"
        }),
        description: string({
            required_error: "Description is required"
        }).min(120, "Description should be at least 120 character"),
        price: number({
            required_error: "Price is required"
        }),
        image: string({
            required_error: "Image is required"
        })
    })
}

const params = {
    params: object({
        productId: string({
            required_error: "ProductId is required"
        }),
    })
}

export const createProductValidation = object({
    ...payload
})

export const updateProductValidation = object({
    ...payload,
    ...params,
})

export const findProductValidation = object({
    ...params
})

export const deleteProductValidation = object({
    ...params
})

export type createProductInput = TypeOf<typeof createProductValidation>;
export type updateProductInput = TypeOf<typeof updateProductValidation>;
export type findProductInput = TypeOf<typeof findProductValidation>;
export type deleteProductInput = TypeOf<typeof deleteProductValidation>;