import logo from "../../assets/logo.png";
import { Link } from "react-router";
export default function Logo({w}) {
  return (
    <Link to="/" className="flex flex-col mb-6">
      <img className={`w-${w}`} src={logo} alt="UniMart logo" />
    </Link>
  );
}
