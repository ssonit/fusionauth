"use client";

import Image from "next/image";
import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Icons } from "./Icons";

export default function HeroSlider({
  images = [
    "https://res.cloudinary.com/dyq35jdkl/image/upload/v1698322292/ecommerce/carousel-1_duvpku.webp",
    "https://res.cloudinary.com/dyq35jdkl/image/upload/v1698322288/ecommerce/carousel-3_xoyy3m.webp",
    "https://res.cloudinary.com/dyq35jdkl/image/upload/v1698322288/ecommerce/carousel-5_n5qlpy.webp",
  ],
}: {
  images?: string[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        draggable={true}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide className="w-full" key={index}>
            <div className="w-full">
              <AspectRatio ratio={16 / 7}>
                <Image
                  src={image}
                  alt="Image"
                  fill
                  className="rounded-md object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        className="absolute top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full p-2.5"
        variant={"outline"}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <Icons.ChevronLeft></Icons.ChevronLeft>
      </Button>
      <Button
        className="absolute right-0 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full p-2.5"
        variant={"outline"}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <Icons.ChevronRight></Icons.ChevronRight>
      </Button>
    </div>
  );
}
