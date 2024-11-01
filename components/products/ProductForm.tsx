import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Product } from "@prisma/client"

async function getCategories() {
    return await prisma.category.findMany()
}

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({product}: ProductFormProps) {
    const categories = await getCategories()
    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Price:</label>
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Price"
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Category:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <ImageUpload image={product?.image} />
        </>
    )
}