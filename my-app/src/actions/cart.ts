"use server";

import { TCartProductResponse } from "@/types/carts";
import { ESortDirection } from "@/types/products";

export const getProductsCart = async ({
  page,
  limit,
  sort,
  dir,
}: {
  page?: number;
  limit?: number;
  sort?: string;
  dir?: ESortDirection;
}) => {
  const searchParams: {
    [key: string]: string;
  } = {
    page: page?.toString() || "1",
    limit: limit?.toString() || "10",
  };
  if (sort && dir) {
    searchParams["sort"] = sort;
    searchParams["dir"] = dir;
  }

  const res = await fetch(
    "http://localhost:3002/api/cart?" + new URLSearchParams(searchParams),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data: TCartProductResponse = await res.json();
  return data;
};
