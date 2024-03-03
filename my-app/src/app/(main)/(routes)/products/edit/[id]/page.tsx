import { getProductId } from "@/actions/products";
import ProductForm from "@/components/ProductForm";
import SectionTitle from "@/components/SectionTitle";
import { Separator } from "@/components/ui/separator";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProductId(params.id);

  if (!data) return null;

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
