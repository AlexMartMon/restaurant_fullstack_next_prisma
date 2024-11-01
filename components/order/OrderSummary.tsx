"use client";
import { useStore } from "@/src/utils/store";
import ProductDetail from "./ProductDetail";
import { formatCurrency } from "@/src/utils";
import { useMemo } from "react";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.subtotal, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    toast.success("Order completed successfully.");
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">My Order</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">cart is empty</p>
      ) : (
        <>
          <div className="mt-5">
            {order.map((item) => (
              <ProductDetail product={item} key={item.id} />
            ))}
          </div>

          <p className="text-2xl mt-20 text-center">
            Total:
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Enter your name."
              name="name"
              className=" bg-white border border-gray-100 p-2 w-full"
            />

            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full font-bold text-center cursor-pointer"
              value="Confirm your Order."
            />
          </form>
        </>
      )}
    </aside>
  );
}
