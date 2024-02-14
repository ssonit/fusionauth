import LoginLink from "@/components/LoginLink";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import HeroSlider from "@/components/HeroSlider";
// import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <main className="container">
        <Heading></Heading>
        {/* <ProductList className='my-5' data={products}></ProductList> */}
      </main>
      <Footer className="my-8"></Footer>
      {/* <div>
        <h1>Welcome to FusionAuth + Next.js</h1>
        <LoginLink />
      </div> */}
    </div>
  );
}
