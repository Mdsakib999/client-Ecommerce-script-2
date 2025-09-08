import Banner from "../components/Home/Banner";
import Brands from "../components/Home/Brands";
import PopularProduct from "../components/Home/PopularProduct";
import Faq from "../components/Home/Faq";
import Featured from "../components/Home/Featured";
import Offer from "../components/Home/Offer";
import OfferedProducts from "../components/Home/OfferedProducts";
import RecomenderProduct from "../components/Home/RecomenderProduct";

export default function Home() {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-16">
      <Banner />
      <Featured />
      <OfferedProducts />
      <PopularProduct />
      <Offer />
      <RecomenderProduct />
      <Faq />
      <Brands />
    </div>
  );
}
