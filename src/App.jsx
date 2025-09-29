import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import ScrollToTopButton from "./utils/ScrollToTopButton";

export default function App() {
  return (
    <div className="font-montserrat">
      <Navbar />
      <ScrollToTop />
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
