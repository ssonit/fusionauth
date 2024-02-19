"use client";

import { useState } from "react";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export default function Quantity({
  quantity,
  handleChange,
}: {
  quantity?: number;
  handleChange: (value: number) => void;
}) {
  const [localQuantity, setLocalQuantity] = useState(quantity || 1);

  const handleChangeQuantity = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setLocalQuantity((prev) => prev + 1);
      handleChange(localQuantity + 1);
    }
    if (type === "decrease" && localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
      handleChange(localQuantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-300 p-1">
      <Button
        onClick={() => handleChangeQuantity("decrease")}
        variant={"ghost"}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-1"
      >
        <Icons.Minus></Icons.Minus>
      </Button>
      <div className="w-8 text-center">{localQuantity || quantity}</div>
      <Button
        onClick={() => handleChangeQuantity("increase")}
        variant={"ghost"}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-1"
      >
        <Icons.Plus></Icons.Plus>
      </Button>
    </div>
  );
}
