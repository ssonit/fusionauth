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
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { IImage, IProduct } from "@/types/products";

export default function InfoProduct({ product }: { product: IProduct }) {
  const router = useRouter();
  const { images, name, description, _id: id, price } = product;
  const url = (images as IImage[])?.[0].url;

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const handleChange = (value: number) => {
    setQuantity(value);
  };

  const handleSelectedColor = (id: string) => {
    setSelectedColor(id);
  };
  const handleSelectedStorage = (id: string) => {
    setSelectedStorage(id);
  };

  const handleAddCart = async () => {
    try {
      // Nên thêm disabled để tránh người dùng spam liên tục
      // await axios.post("/api/cart", {
      //   quantity,
      //   colorId: selectedColor,
      //   productId: id,
      // });

      router.refresh();
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      console.log(error);
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
              {/* <div className="mt-6 flex items-center gap-6">
                <span className="w-20">Màu</span>
                <div className="flex items-center gap-3">
                  {colors.map((item) => (
                    <Button
                      key={item._id}
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => handleSelectedColor(item._id)}
                      className={cn(
                        "flex items-center border-2 w-full px-3 h-8 justify-center transition-all duration-200"
                      )}
                      style={{
                        backgroundColor:
                          item._id === selectedColor ? "purple" : "transparent",
                        color: item._id === selectedColor ? "white" : "black",
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <span className="w-20">Dung lượng</span>
                <div className="flex items-center gap-3">
                  {storages.map((item) => (
                    <Button
                      key={item._id}
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => handleSelectedStorage(item._id)}
                      className={cn(
                        "flex items-center border-2 w-full px-3 h-8 justify-center transition-all duration-200"
                      )}
                      style={{
                        backgroundColor:
                          item._id === selectedStorage
                            ? "purple"
                            : "transparent",
                        color: item._id === selectedStorage ? "white" : "black",
                      }}
                    >
                      {item.name} {unitStorage[item.unit]}
                    </Button>
                  ))}
                </div>
              </div> */}

              <div className="mt-6 flex items-center gap-6">
                <span className="w-20">Số lượng</span>
                <Quantity
                  quantity={quantity}
                  handleChange={handleChange}
                ></Quantity>
              </div>
            </CardContent>
            <CardFooter className="mt-3 flex items-center gap-6 px-3 pb-2">
              <Button variant={"outline"}>
                <Icons.Heart className="stroke-pink-500"></Icons.Heart>
              </Button>
              <Button onClick={handleAddCart} variant={"outline"}>
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

      {/* <RelatedProduct className="mb-5"></RelatedProduct> */}
    </div>
  );
}
