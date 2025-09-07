import Banner from "../components/Home/Banner";
import Brands from "../components/Home/Brands";
import CustomerLoved from "../components/Home/CustomerLoved";
import Faq from "../components/Home/Faq";
import Featured from "../components/Home/Featured";
import Footer from "../components/Home/Footer";
import Offer from "../components/Home/Offer";
import OfferedProducts from "../components/Home/OfferedProducts";
import RecomenderProduct from "../components/Home/RecomenderProduct";
import Test from "../components/Home/Test";

export default function Home() {
  return (
    <div  className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-16">
      <Banner />
      <Featured />
      <OfferedProducts />
      <CustomerLoved />
      <Offer />
      <RecomenderProduct />
      <Faq />
      <Brands />
      <Footer />
    </div>
  );
}
