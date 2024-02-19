import { getColors } from "@/actions/colors";
import { getProductId } from "@/actions/products";
import Footer from "@/components/Footer";
import InfoProduct from "@/components/InfoProduct";

export default async function DetailProduct({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductId({
    productId: params.productId,
  });

  const colors = await getColors();

  if (!product) return null;
  return (
    <section>
      <div className="container">
        <div className="mt-10">
          <InfoProduct product={product} colors={colors}></InfoProduct>
        </div>
      </div>
      <Footer className="my-8"></Footer>
    </section>
  );
}
