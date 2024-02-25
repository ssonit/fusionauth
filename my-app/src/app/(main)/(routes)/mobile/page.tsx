import { getProducts } from "@/actions/products";
import ProductList from "@/components/ProductList";
import SortButton from "@/components/SortButton";
import { TSortDirection } from "@/types/products";

export default async function Mobile({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const dir = searchParams?.dir as TSortDirection;
  const order = searchParams?.order as string;

  const { data } = await getProducts({
    sort: order,
    dir,
  });

  return (
    <div className="container">
      <SortButton dir={dir}></SortButton>
      <section>
        <ProductList data={data.data}></ProductList>
      </section>
    </div>
  );
}
