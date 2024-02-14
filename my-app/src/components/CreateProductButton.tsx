"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export default function CreateProductButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/admin/products/create")}>
      <Icons.Plus className="mr-2 h-4 w-4"></Icons.Plus>
      <span>Tạo sản phẩm</span>
    </Button>
  );
}
