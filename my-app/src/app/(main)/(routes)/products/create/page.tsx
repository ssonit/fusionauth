import ProductForm from "@/components/ProductForm";
import SectionTitle from "@/components/SectionTitle";
import { Separator } from "@/components/ui/separator";

export default function CreateProduct() {
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
