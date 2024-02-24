"use server";

import { TProductDetailResponse, TProductResponse } from "@/types/products";

export const getProducts = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  const res = await fetch(
    "http://localhost:3002/api/product?" +
      new URLSearchParams({
        page: page?.toString() || "1",
        limit: limit?.toString() || "10",
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data: TProductResponse = await res.json();
  return data;
};

export const getProductId = async (id: string) => {
  const res = await fetch("http://localhost:3002/api/product/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data: TProductDetailResponse = await res.json();
  return data;
};
