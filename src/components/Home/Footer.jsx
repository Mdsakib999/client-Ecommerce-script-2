import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 md:gap-8 lg:gap-0 text-left px-2">
        {/* Logo & Description */}
        <div className="space-y-4 pt-1 col-span-1 md:col-span-1 px-1">
          <img
            className="w-44 mx-auto md:mx-0 h-18"
            src="https://i.ibb.co.com/bRDdfVBp/logo-4.png"
            alt="UniMart"
          />
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
            UniMart Industries Ltd.
          </h6>
          <form className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm block">Enter your email address</label>
              <div className="flex">
                
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="border border-gray-600 rounded-l-md pl-3 py-1 w-[200px] "
                />
                <button
                  type="submit"
                  className="bg-gray-700 opacity-80 text-white rounded-r-md px-4 py-1 font-semibold hover:bg-gray-500 transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="text-gray-600">
                <FaFacebook size={28} />
              </a>
              <a href="#" className="text-gray-600">
                <FaYoutube size={28} />
              </a>
              <a href="#" className="text-gray-600">
                <AiFillInstagram size={28} />
              </a>
              <a href="#" className="text-gray-600">
                <FaTwitter size={28} />
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
