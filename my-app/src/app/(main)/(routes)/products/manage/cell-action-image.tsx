"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductColumn } from "./columns";
import Image from "next/image";

export default function CellActionImage({ data }: { data: ProductColumn }) {
  const { image } = data;
  console.log(data);

  return (
    <div className="w-14">
      <AspectRatio ratio={1 / 1} className="relative h-full">
        <Image
          src={image}
          alt={image}
          className="h-full w-full select-none rounded-md object-cover transition"
          fill
          sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
          priority
          quality={100} //default 75
        ></Image>
      </AspectRatio>
    </div>
  );
}
