import Banner from "../components/Home/Banner";
import CustomerLoved from "../components/Home/CustomerLoved";
import Featured from "../components/Home/Featured";
import Footer from "../components/Home/Footer";
import RecomenderProduct from "../components/Home/RecomenderProduct";

export default function Home() {
  return (
    <div  className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-16">
      <Banner />
      <Featured />
      <CustomerLoved />
      <RecomenderProduct />
      <Footer />
    </div>
  );
}
