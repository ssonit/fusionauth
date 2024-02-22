import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import HeroSlider from "@/components/HeroSlider";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/actions/products";

export default async function Home() {
  const { data } = await getProducts({ page: 1, limit: 10 });
  return (
    <div>
      <HeroSlider></HeroSlider>
      <main className="container">
        <Heading></Heading>
        <ProductList className="my-5" data={data.data}></ProductList>
      </main>
      <Footer className="my-8"></Footer>
    </div>
  );
}
