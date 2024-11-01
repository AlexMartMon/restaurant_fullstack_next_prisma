import Heading from "@/components/ui/Heading";
import Link from "next/link";


export default function NotFound() {
  return (
    <div className="text-center">
        <Heading>Product Not Found.</Heading>
        <Link href='/admin/products'
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto">
        Go to Products</Link>
    </div>
  )
}
