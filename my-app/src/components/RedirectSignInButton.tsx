"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function RedirectSignInButton() {
  return (
    <div className="mt-40">
      <div className="flex items-center justify-center">
        <Button onClick={() => signIn()}>Chuyển tới trang đăng nhập</Button>
      </div>
    </div>
  );
}
