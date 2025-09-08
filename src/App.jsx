import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/Home/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
