"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/Icons";
import Quantity from "@/components/Quantity";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function CartItemClient({
  amount,
  cartId,
  price,
  handleChangeValue,
}: {
  amount: number;
  cartId: string;
  price: number;
  handleChangeValue: ({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) => void;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(() => amount);

  const handleChange = (value: number) => {
    setQuantity(value);
    handleChangeValue({
      id: cartId,
      quantity: value,
    });
  };

  const handleDeleteCart = async (id: string) => {
    try {
      const res = await axios.delete(`/api/cart/${id}`);
      const data = res.data;

      toast.success("Xóa thành công");
      router.refresh();
      console.log({ data });
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Không thể xóa");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Quantity quantity={quantity} handleChange={handleChange}></Quantity>
      <p className="w-14 text-center font-medium">{quantity * price}</p>
      <Button onClick={() => handleDeleteCart(cartId)} variant={"destructive"}>
        <Icons.Trash className="h-5 w-5"></Icons.Trash>
      </Button>
    </div>
  );
}
