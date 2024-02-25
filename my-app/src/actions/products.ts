"use server";

import {
  TSortDirection,
  TProductDetailResponse,
  TProductResponse,
} from "@/types/products";

export const getProducts = async ({
  page,
  limit,
  sort,
  dir,
  search,
}: {
  page?: number;
  limit?: number;
  sort?: string;
  dir?: TSortDirection;
  search?: string;
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

  if (search) {
    searchParams["search"] = encodeURIComponent(search);
  }

  const res = await fetch(
    "http://localhost:3002/api/product?" + new URLSearchParams(searchParams),
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
