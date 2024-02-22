import { getProductId } from "@/actions/products";
import Footer from "@/components/Footer";
import InfoProduct from "@/components/InfoProduct";

export default async function DetailProduct({
  params,
}: {
  params: { productId: string };
}) {
  const { data } = await getProductId(params.productId);

  if (!data) return null;
  return (
    <section>
      <div className="container">
        <div className="mt-10">
          <InfoProduct product={data}></InfoProduct>
        </div>
      </div>
      <Footer className="my-8"></Footer>
    </section>
  );
}
