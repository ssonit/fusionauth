"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Heading() {
  const router = useRouter();
  return (
    <div className="mt-4 flex items-center justify-between">
      <h3 className="my-3 text-3xl font-bold uppercase">
        Điện thoại nổi bật nhất
      </h3>
      <Button variant={"ghost"} onClick={() => router.push("/mobile")}>
        Xem tất cả
      </Button>
    </div>
  );
}
