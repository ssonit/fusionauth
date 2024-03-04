import { getProductId } from "@/actions/products";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/components/ProductForm";
import RedirectSignInButton from "@/components/RedirectSignInButton";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const data = await getProductId({ id: params.id, enabled: Boolean(session) });

  if (!data) return <RedirectSignInButton></RedirectSignInButton>;

  return (
    <section>
      <div className="container">
        <SectionTitle
          className="my-3"
          title="Sửa sản phẩm"
          desc="Chỉnh sửa"
        ></SectionTitle>
        <Separator></Separator>

        <div className="my-3">
          <ProductForm initData={data.data}></ProductForm>
        </div>
      </div>
    </section>
  );
}
