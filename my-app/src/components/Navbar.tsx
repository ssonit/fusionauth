import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import UserButtonCustom from "@/components/UserButtonCustom";
import NavbarList from "@/components/NavbarList";
import { getProductsCart } from "@/actions/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types/utils";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;
  const { data } = await getProductsCart({
    page: 1,
    limit: 10,
    user_id: currentUser.id,
  });
  return (
    <nav className="sticky left-0 top-0 z-40 w-full bg-white bg-opacity-40 py-3 shadow-lg">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex-shrink-0">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            priority
          ></Image>
        </Link>
        <div className="ml-6 mr-2 w-[50%] lg:ml-56">
          <SearchBar></SearchBar>
        </div>
        <NavbarList count={data.total}></NavbarList>
        <div className="hidden md:block">
          <UserButtonCustom></UserButtonCustom>
        </div>
      </div>
    </nav>
  );
}
