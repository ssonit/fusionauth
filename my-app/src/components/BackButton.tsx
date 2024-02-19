"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant={"ghost"} onClick={() => router.back()}>
      <Icons.ChevronLeft></Icons.ChevronLeft>
    </Button>
  );
}
