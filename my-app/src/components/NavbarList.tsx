"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { useSession } from "next-auth/react";

export default function NavbarList({ count }: { count?: number }) {
  const { status } = useSession();
  const router = useRouter();

  return (
    <ul className="ml-auto flex items-center gap-9 md:mr-6">
      <li
        className="group relative hidden cursor-pointer md:block"
        onClick={() => router.push("/cart")}
      >
        <Icons.ShoppingCart className="stroke-black group-hover:stroke-muted-foreground"></Icons.ShoppingCart>
        {status === "authenticated" && (
          <div className="absolute -right-3 -top-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-sm text-white">
              {count}
            </div>
          </div>
        )}
      </li>
      <li className="group hidden cursor-pointer md:block">
        <Icons.Heart className="stroke-black group-hover:stroke-muted-foreground"></Icons.Heart>
      </li>
      <li className="group cursor-pointer md:hidden">
        <Icons.Menu className="stroke-black group-hover:stroke-muted-foreground"></Icons.Menu>
      </li>
    </ul>
  );
}
