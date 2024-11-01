import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(search: string) {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);
  return (
    <>
      <Heading>Search results: {searchParams.search}</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">There's not results</p>
      )}
    </>
  );
}
