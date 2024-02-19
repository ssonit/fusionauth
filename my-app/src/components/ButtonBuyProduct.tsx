"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/providers/app-provider";
import { ProductCheckout } from "@/types/products";

export default function ButtonBuyProduct({
  data,
}: {
  data: ProductCheckout[];
}) {
  const router = useRouter();

  const { handleOrderProduct } = useContext(AppContext);

  const handleBuyProduct = () => {
    if (data.length > 0) {
      handleOrderProduct(data);

      router.push("/checkout");
    }
  };

  return <Button onClick={handleBuyProduct}>Mua ngay</Button>;
}
