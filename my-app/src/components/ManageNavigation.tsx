"use client";

import { usePathname, useRouter } from "next/navigation";
import { LIMIT_PRODUCT, createQueryString } from "@/constants/utils";
import useQueryConfig from "@/hooks/useQueryConfig";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function ManageNavigation({
  className,
  currentPage,
  total,
}: {
  className?: string;
  currentPage: number;
  total: number;
}) {
  const router = useRouter();
  const queryConfig = useQueryConfig();
  const pathname = usePathname();
  const handleNavigate = (type: "prev" | "next") => {
    if (type === "prev" && currentPage > 1) {
      router.push(
        `${pathname}?${createQueryString({
          ...queryConfig,
          page: currentPage - 1,
        })}`
      );
      return;
    }
    if (type === "next" && currentPage < Math.ceil(total / LIMIT_PRODUCT)) {
      router.push(
        `${pathname}?${createQueryString({
          ...queryConfig,
          page: currentPage + 1,
        })}`
      );
      return;
    }
  };
  return (
    <div className={cn("flex items-center justify-end", className)}>
      <Button
        onClick={() => handleNavigate("prev")}
        variant={"ghost"}
        className="hover:text-blue-800"
      >
        Trước
      </Button>
      <Button
        onClick={() => handleNavigate("next")}
        variant={"ghost"}
        className="hover:text-blue-800"
      >
        Sau
      </Button>
    </div>
  );
}
