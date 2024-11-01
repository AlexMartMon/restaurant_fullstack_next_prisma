import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string().min(1, 'Your name is mandatory.'),
    total: z.number().min(1,'There is errors on your order.'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const SearchSchema = z.object({
    search: z.string().trim().min(1, 'Search field can not be empty.')
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'Product Name can not be empty.'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Invalid Price' })
        .or(z.number()),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'Category can not be empty.' })
        .or(z.number().min(1, {message: 'Category can not be empty.' })),
    image: z.string().min(1, {message: 'Image is mandatory.'})
})