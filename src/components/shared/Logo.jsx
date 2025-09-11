import { Link } from "react-router";
import logo from "../../assets/logo.png";
export default function Logo({ w }) {
  return (
    <Link to="/" className="flex flex-col mb-2">
      <img className={`w-${w}`} src={logo} alt="UniMart logo" />
    </Link>
  );
}
