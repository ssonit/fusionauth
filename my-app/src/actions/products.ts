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
  user_id,
}: {
  page?: number;
  limit?: number;
  sort?: string;
  dir?: TSortDirection;
  search?: string;
  user_id?: string;
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

  if (user_id) {
    searchParams["user_id"] = user_id;
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

export const getProductId = async ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) => {
  if (!enabled) return null;
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
