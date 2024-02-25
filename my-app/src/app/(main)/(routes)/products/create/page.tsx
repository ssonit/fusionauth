import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/components/ProductForm";
import SectionTitle from "@/components/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateProduct() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <section>
      <div className="container">
        <SectionTitle
          className="my-3"
          title="Tạo sản phẩm"
          desc="Thêm sản phẩm mới"
        ></SectionTitle>
        <Separator></Separator>

        <div className="my-3">
          <ProductForm></ProductForm>
        </div>
      </div>
    </section>
  );
}
