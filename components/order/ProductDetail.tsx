import { OrderItem } from "@/src/types";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../../src/utils/index";
import { useStore } from "@/src/utils/store";
import { useMemo } from "react";

type ProductDetailProps = {
  product: OrderItem;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const disableDecreaseButton = useMemo(
    () => product.quantity === 1,
    [product]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{product.name} </p>

          <button type="button" onClick={() => removeFromCart(product.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(product.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
            onClick={() => decreaseQuantity(product.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{product.quantity}</p>

          <button type="button" onClick={() => increaseQuantity(product.id)}>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {formatCurrency(product.subtotal)}
          <span className="font-normal"></span>
        </p>
      </div>
    </div>
  );
}
