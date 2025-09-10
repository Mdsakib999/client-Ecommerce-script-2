import Banner from "../components/Home/Banner";
import Brands from "../components/Home/Brands";
import Featured from "../components/Home/Featured";
import Offer from "../components/Home/Offer";
import OfferedProducts from "../components/Home/OfferedProducts";
import PopularProduct from "../components/Home/PopularProduct";
import RecomendedProduct from "../components/Home/RecomendedProduct";
import TopBanner from "../components/Home/TopBanner";

export default function Home() {
  return (
    <>
      <TopBanner />
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-16">
        <Banner />
        <Featured />
        <OfferedProducts />
        <PopularProduct />
        <Offer />
        <RecomendedProduct />
        <Brands />
      </div>
    </>
  );
}
