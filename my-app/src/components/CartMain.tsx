"use client";

import { useMemo, useState } from "react";
import ButtonBuyProduct from "@/components/ButtonBuyProduct";
import CartProductItem from "@/components/CartProductItem";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TCartProductItem } from "@/types/carts";

export default function CartMain({
  initCarts,
}: {
  initCarts: TCartProductItem[];
}) {
  const [carts, setCarts] = useState(
    initCarts.map((item) => ({ ...item, checked: false }))
  );

  const isAllChecked = useMemo(
    () => !carts.some((item) => !item.checked),
    [carts]
  );

  const totalPrice = useMemo(
    () =>
      carts
        .filter((item) => item.checked)
        .reduce(
          (total, item) =>
            total + Number(item.product.price.toString()) * item.quantity,
          0
        ),
    [carts]
  );

  const handleChangeQuantityCarts = ({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) => {
    setCarts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
    );
  };

  const handleChecked = ({ id, checked }: { id: string; checked: boolean }) => {
    setCarts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked,
          };
        }
        return item;
      })
    );
  };

  const handleCheckAll = () => {
    setCarts((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked,
      }))
    );
  };

  const handleDeleteCart = (id: string) => {
    setCarts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container min-h-screen">
        {initCarts.length > 0 && (
          <>
            <div className="my-4 flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={isAllChecked}
                onCheckedChange={handleCheckAll}
              ></Checkbox>
              <label htmlFor="select-all" className="select-none">
                Chọn tất cả
              </label>
            </div>

            <Card>
              <CardContent className="flex flex-col gap-2">
                {carts.map((item) => (
                  <CartProductItem
                    key={item.id}
                    cartItem={item}
                    handleChecked={({ id, checked }) =>
                      handleChecked({ id, checked })
                    }
                    handleChange={handleChangeQuantityCarts}
                    handleDelete={handleDeleteCart}
                  ></CartProductItem>
                ))}
              </CardContent>
            </Card>
          </>
        )}
        {initCarts.length === 0 && (
          <div className="mt-6 flex items-center justify-center font-medium">
            Chưa có sản phẩm
          </div>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white">
        <div className="container flex items-center justify-between py-3">
          <div>
            <p className="font-semibold text-red-600">{totalPrice}</p>
          </div>
          <ButtonBuyProduct
            data={carts
              .filter((item) => item.checked)
              .map((item) => ({
                id: item.productId,
                color: {
                  name: item.color.name,
                  id: item.colorId,
                },
                image: item.product.images[0].url,
                name: item.product.name,
                price: Number(item.product.price.toString()),
                quantity: item.quantity,
                cartId: item.id,
              }))}
          ></ButtonBuyProduct>
        </div>
      </div>
    </>
  );
}
