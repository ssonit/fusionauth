"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import CheckoutClient from "@/components/CheckoutClient";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import RedirectSignInButton from "@/components/RedirectSignInButton";

export default function Checkout() {
  const { status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsClient(true);
    }
  }, [status]);

  if (status === "unauthenticated") {
    return <RedirectSignInButton></RedirectSignInButton>;
  }

  return (
    <section>
      {isClient && (
        <>
          <div>
            <div className="container flex items-center gap-8 py-5">
              <BackButton></BackButton>
              <div className="select-none text-2xl font-semibold">
                Thanh toán
              </div>
            </div>
          </div>

          <Separator></Separator>

          <CheckoutClient></CheckoutClient>
        </>
      )}
    </section>
  );
}
