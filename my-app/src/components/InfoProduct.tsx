"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonBuyProduct from "@/components/ButtonBuyProduct";
import { Icons } from "@/components/Icons";
import Quantity from "@/components/Quantity";
import RelatedProduct from "@/components/RelatedProduct";
import ReviewItem from "@/components/ReviewItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { IImage, IProduct } from "@/types/products";
import instance from "@/lib/instance";
import { useSession } from "next-auth/react";
import { User } from "@/types/utils";

export default function InfoProduct({ product }: { product: IProduct }) {
  const router = useRouter();
  const { data } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const user_id = (data?.user as User)?.id || null;

  const {
    images,
    name,
    description,
    _id: id,
    price,
    quantity: max_quantity,
  } = product;
  const url = (images as IImage[])?.[0].url;

  const handleChange = (value: number) => {
    setQuantity(value);
  };

  const handleAddCart = async () => {
    try {
      // Nên thêm disabled để tránh người dùng spam liên tục
      if (!user_id) {
        toast.error("Vui lòng đăng nhập");
        return;
      }
      setIsLoading(true);
      await instance.post("/api/cart/create", {
        user_id,
        quantity,
        product: id,
      });

      router.refresh();
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="mb-10">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-5">
            <div className="p-2">
              <AspectRatio ratio={1 / 1} className="relative w-full">
                <Image
                  src={url}
                  alt={name}
                  className="h-full w-full select-none rounded-md object-cover transition"
                  fill
                  sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
                  quality={100} //default 75
                ></Image>
              </AspectRatio>
            </div>
          </div>
          <div className="col-span-1 mt-16 md:mt-0 lg:col-span-7">
            <CardHeader className="px-3 pb-4">
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="rounded bg-gray-100 px-6 py-3 font-semibold text-red-600">
                {price.toString()}
              </div>

              <div className="mt-6 flex items-center gap-6">
                <span className="w-20">Số lượng</span>
                <Quantity
                  quantity={quantity}
                  handleChange={handleChange}
                ></Quantity>
                <span className="text-sm font-medium">
                  {max_quantity} sản phẩm
                </span>
              </div>
            </CardContent>
            <CardFooter className="mt-3 flex items-center gap-6 px-3 pb-2">
              <Button variant={"outline"}>
                <Icons.Heart className="stroke-pink-500"></Icons.Heart>
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleAddCart}
                variant={"outline"}
              >
                Thêm vào giỏ hàng
              </Button>
              <ButtonBuyProduct
                data={[
                  {
                    id,
                    quantity,
                  },
                ]}
              ></ButtonBuyProduct>
            </CardFooter>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent>
          <section className="my-9">
            <div className="text-lg font-bold">Đánh giá sản phẩm</div>
            <div className="mt-4">
              <ReviewItem></ReviewItem>
            </div>
          </section>
        </CardContent>
      </Card>

      <RelatedProduct className="mb-5"></RelatedProduct>
    </div>
  );
}
