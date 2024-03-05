"use client";

import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppContext } from "@/providers/app-provider";
import { Button } from "./ui/button";
import instance from "@/lib/instance";
import { IImage, IProduct, TProductResponse } from "@/types/products";
import toast from "react-hot-toast";

// const formSchema = formCheckoutSchema;

export default function CheckoutFormSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IProduct[]>([]);
  const { productOrder } = useContext(AppContext);

  const ids = useMemo(
    () => productOrder.map((item) => item.id).join(","),
    [productOrder]
  );

  useEffect(() => {
    async function getProductsOrder() {
      try {
        setIsLoading(true);
        const res = await instance.get<TProductResponse>(
          `/api/product?page=1&limit=10&ids=${ids}`
        );
        const data = res.data;
        setOrders(
          data.data.data.map((item, index) => ({
            ...item,
            quantity: productOrder[index].quantity,
            max_quantity: item.quantity,
          }))
        );
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    getProductsOrder();
  }, [ids, productOrder]);

  const totalPrice = useMemo(
    () => orders.reduce((total, item) => total + item.price * item.quantity, 0),
    [orders]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin giỏ hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-1.5">
          {!isLoading &&
            orders.map((item) => (
              <div key={item._id} className="flex flex-1 cursor-pointer gap-3">
                <div className="w-14">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={(item.images[0] as IImage).url}
                      alt={item.name}
                      className="h-full w-full select-none rounded-md object-cover transition"
                      fill
                      sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
                      quality={100} //default 75
                    ></Image>
                  </AspectRatio>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex flex-col justify-start h-full">
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {item.price}
                    </p>
                  </div>
                  <div>x{item.quantity}</div>
                </div>
              </div>
            ))}
          {isLoading && <div>loading...</div>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span>Tổng:</span>
            <span className="font-bold">{totalPrice}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Phí vận chuyển:</span>
            <span>0</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Giảm:</span>
            <span>0</span>
          </div>
        </div>

        <Separator></Separator>
        <div className="flex items-center justify-between text-xl font-semibold">
          <span>Tổng tiền:</span>
          <span className="font-bold">{totalPrice}</span>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          Đặt hàng
        </Button>
      </CardContent>
    </Card>
  );
}
