import { useEffect } from "react";
import Banner from "../components/Home/Banner";
import Featured from "../components/Home/Featured";
import Offer from "../components/Home/Offer";
import OfferedProducts from "../components/Home/OfferedProducts";
import PopularProduct from "../components/Home/PopularProduct";
import RecommendedProduct from "../components/Home/RecommendedProduct";
import Solution from "../components/Home/Solution";
import TopBanner from "../components/Home/TopBanner";
import toast from "react-hot-toast";

export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");

    if (success) {
      toast.success(<h1 className="font-serif">{success}</h1>, {
        position: "bottom-right",
      });

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-16">
        <Banner />
        <Featured />
        <OfferedProducts />
        <PopularProduct />
        <Offer />
        <RecommendedProduct />
        <TopBanner />
        <Solution />
      </div>
    </>
  );
}
