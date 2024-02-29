import { getProductsCart } from "@/actions/cart";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import CartMain from "@/components/CartMain";
import { Separator } from "@/components/ui/separator";
import { ESortDirection } from "@/types/products";
import { User } from "@/types/utils";
import { getServerSession } from "next-auth";

export default async function ShoppingCart() {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user as User;
  const { data } = await getProductsCart({
    page: 1,
    limit: 10,
    sort: "createdAt",
    dir: ESortDirection.DESC,
    user_id: currentUser.id,
  });

  console.log(data.data);

  return (
    <section className="relative">
      <div>
        <div className="container flex items-center gap-8 py-5">
          <BackButton></BackButton>
          <div className="select-none text-2xl font-semibold">
            Giỏ hàng của bạn
          </div>
        </div>
      </div>

      <Separator></Separator>

      <CartMain initCarts={data.data}></CartMain>
    </section>
  );
}
