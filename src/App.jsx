import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
