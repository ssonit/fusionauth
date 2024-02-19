import { getProducts } from "@/actions/products";
import ProductList from "@/components/ProductList";
import SortButton from "@/components/SortButton";
import { SortDirection } from "@/types/products";

export default async function Mobile({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const dir = searchParams?.dir as SortDirection;
  const order = searchParams?.order as string;

  // const products = await getProducts({
  //   [order]: dir
  // });

  return (
    <div className="container">
      <SortButton dir={dir}></SortButton>
      <section>{/* <ProductList data={products}></ProductList> */}</section>
    </div>
  );
}
