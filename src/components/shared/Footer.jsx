import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import logo from "../../assets/footerLogo.png";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 md:gap-8 lg:gap-0 text-left px-2">
        {/* Logo & Description */}
        <div className="space-y-4 pt-1 col-span-1 md:col-span-1 px-1">
          <Link to="/" className="mb-2">
            <img className="w-48 sm:w-full" src={logo} alt="UniMart logo" />
          </Link>

          <p className="text-sm">
            <span className="text-lg font-semibold">
              UniMart Industries Ltd.
            </span>
            <br />
            <span className="opacity-60">
              Providing reliable tech since 1992
            </span>
          </p>
        </div>

        {/* Services */}
        <div className="md:pl-10">
          <h6 className="font-semibold mb-4 text-lg">Services</h6>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a href="#" className="hover:underline">
                Branding
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Advertisement
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:pl-10">
          <h6 className="font-semibold mb-4 text-lg">Company</h6>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press kit
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="font-semibold mb-4 text-lg">Legal</h6>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a href="#" className="hover:underline">
                Terms of use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Marketing policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter / Social → span 2 cols */}
        <div className="md:col-span-2">
          <h6 className="font-semibold mb-4 text-lg">
            Subscribe to our newsletter
          </h6>
          <form className="space-y-3">
            <div className="w-full max-w-lg mx-auto">
              <div className="flex items-center bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-700 w-full">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 min-w-0 bg-transparent text-gray-100 placeholder-gray-500 px-5 py-3 text-sm focus:ring-0 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-semibold text-sm rounded-full transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="border-2 border-gray-600 hover:border-blue-500 bg-gray-900 text-gray-200 hover:bg-blue-500 hover:text-white duration-300 rounded-full p-2"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="border-2 border-gray-600 hover:border-red-500 bg-gray-900 text-gray-200 hover:bg-red-500 hover:text-white duration-300 rounded-full p-2"
              >
                <Youtube size={22} />
              </a>
              <a
                href="#"
                className="border-2 border-gray-600 hover:border-blue-400 bg-gray-900 text-gray-200 hover:bg-blue-400 hover:text-white duration-300 rounded-full p-2"
              >
                <Twitter size={22} />
              </a>{" "}
              <a
                href="#"
                className="border-2 border-gray-600 hover:border-rose-500 bg-gray-900 text-gray-200 hover:bg-rose-500 hover:text-white duration-300 rounded-full p-2"
              >
                <Instagram size={22} />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="pt-10">
        <hr className="border-gray-700" />
        <p className="text-center text-sm opacity-60 pt-4">
          UniMart © 2025 Demo Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
