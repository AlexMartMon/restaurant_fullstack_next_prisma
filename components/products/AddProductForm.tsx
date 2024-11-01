"use client"

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


/* uso server compose por problemas para implementar el toast en este componente de cliente
y en el children que es el formulario usa el servidor, asi que he tenido que resolverlo asi.
nota para el futuro yo.
*/
export default function AddProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.map(error => toast.error(error.message))
            return
        }
        const response = await createProduct(result.data)
        if (response?.errors) {
          response.errors.map(error => toast.error(error.message))
          return
        }
        toast.success('Product created successfully.')
        router.push('/admin/products')
    }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5"
      action={handleSubmit}>
        {children}
        <input
          type="submit"
          value="Register Product"
          className="bg-indigo-400 hover:bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  );
}
