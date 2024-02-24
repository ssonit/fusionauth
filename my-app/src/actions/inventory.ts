"use server";

export const getInventory = async ({ product_id }: { product_id: string }) => {
  const res = await fetch("http://localhost:3002/api/inventory/" + product_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};
