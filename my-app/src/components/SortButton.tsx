"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SortDirection } from "@/types/products";

export default function SortButton({ dir }: { dir: SortDirection }) {
  const router = useRouter();
  return (
    <section className="my-5">
      <h4 className="text-2xl font-semibold">Sắp xếp theo</h4>
      <div className="mt-3 flex items-center gap-4">
        <Button
          onClick={() => router.push("/mobile?order=price&dir=desc")}
          variant={"outline"}
          className={cn("gap-2", dir === "desc" && "border-slate-800")}
        >
          <Icons.ArrowDownNarrowWide></Icons.ArrowDownNarrowWide>
          <span>Giá cao - thấp</span>
        </Button>
        <Button
          onClick={() => router.push("/mobile?order=price&dir=asc")}
          variant={"outline"}
          className={cn("gap-2", dir === "asc" && "border-slate-900")}
        >
          <Icons.ArrowUpNarrowWide></Icons.ArrowUpNarrowWide>
          <span>Giá thấp - cao</span>
        </Button>
      </div>
    </section>
  );
}
