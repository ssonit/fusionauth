import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartItemClient from "@/components/CartItemClient";
import { Icons } from "@/components/Icons";
import Quantity from "@/components/Quantity";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TCartProductItem } from "@/types/carts";
import axios from "axios";
import toast from "react-hot-toast";

export default function CartProductItem({
  cartItem,
  handleChange,
  handleChecked,
  handleDelete,
}: {
  cartItem: TCartProductItem & {
    checked: boolean;
  };
  handleChange: ({ id, quantity }: { id: string; quantity: number }) => void;
  handleChecked: ({ id, checked }: { id: string; checked: boolean }) => void;
  handleDelete: (id: string) => void;
}) {
  const {
    product: { images, name },
    color,
    id,
    checked,
  } = cartItem;

  const price = Number(cartItem.product.price.toString());

  const router = useRouter();
  const [quantity, setQuantity] = useState(() => cartItem.quantity);

  const handleChangeValue = (value: number) => {
    setQuantity(value);
    handleChange({
      id,
      quantity: value,
    });
  };

  const handleDeleteCart = async (id: string) => {
    try {
      const res = await axios.delete(`/api/cart/${id}`);
      const data = res.data;

      handleDelete(id);

      toast.success("Xóa thành công");
      router.refresh();
      console.log({ data });
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Không thể xóa");
      console.log(error);
    }
  };

  return (
    <div className="mt-3 flex gap-6">
      <Checkbox
        className="mt-4"
        checked={checked}
        onCheckedChange={() => handleChecked({ id, checked: !checked })}
      ></Checkbox>
      <div
        onClick={() => router.push(`/${cartItem.product.id}`)}
        className="flex flex-1 cursor-pointer gap-3"
      >
        <div className="w-24">
          <AspectRatio ratio={3 / 4} className="relative h-full">
            <Image
              src={images[0].url}
              alt={name}
              className="h-full w-full select-none rounded-md object-cover transition"
              fill
              sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
              quality={100} //default 75
            ></Image>
          </AspectRatio>
        </div>
        <div className="flex-1">
          <CardTitle className="mt-2 text-2xl">{name}</CardTitle>
          <p className="font-semibold text-muted-foreground">
            {price.toString()}
          </p>
          <p>Màu: {color.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Quantity
          quantity={quantity}
          handleChange={handleChangeValue}
        ></Quantity>
        <p className="w-14 text-center font-medium">{quantity * price}</p>
        <Button onClick={() => handleDeleteCart(id)} variant={"destructive"}>
          <Icons.Trash className="h-5 w-5"></Icons.Trash>
        </Button>
      </div>
    </div>
  );
}
