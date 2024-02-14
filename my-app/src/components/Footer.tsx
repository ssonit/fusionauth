import Image from "next/image";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn(className)}>
      <Separator className="mb-8"></Separator>
      <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-purple-600">Giới thiệu</h2>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            priority
          ></Image>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-purple-600">Liên kết</h2>
          <ul className="col-span-1 mt-3 flex flex-col gap-2">
            <li>Tìm kiếm</li>
            <li>Bảo mật</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản dịch vụ</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-purple-600">
            Thông tin liên hệ
          </h2>
          <ul className="col-span-1 mt-3 flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <Icons.Home className=" h-4 w-4"></Icons.Home>
              <span className="text-sm">New York</span>
            </li>
            <li className="flex items-center gap-2">
              <Icons.Phone className=" h-4 w-4"></Icons.Phone>
              <span className="text-sm">+1 234 56 789</span>
            </li>
            <li className="flex items-center gap-2">
              <Icons.Mail className=" h-4 w-4"></Icons.Mail>
              <span className="text-sm">dev@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
