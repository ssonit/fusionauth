"use client";

import { useEffect, useState } from "react";
import Divider from "@/components/Divider";
import ProductList from "@/components/ProductList";
import axios from "axios";
import { IProduct } from "@/types/products";

export default function RelatedProduct({ className }: { className?: string }) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:3002/api/product?page=1&limit=20"
      );
      const data = res.data.data;
      setProducts(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className={className}>
      <Divider className="my-5">Có thể bạn cũng thích</Divider>
      <ProductList data={products}></ProductList>
    </div>
  );
}
