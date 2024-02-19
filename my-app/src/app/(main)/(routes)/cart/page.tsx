import BackButton from "@/components/BackButton";
import CartMain from "@/components/CartMain";
import { Separator } from "@/components/ui/separator";

export default async function ShoppingCart() {
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

      <CartMain initCarts={[]}></CartMain>
    </section>
  );
}
