import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white px-6 pt-18 pb-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Description */}

          <div className="space-y-4">
            <img
              className="w-36 opacity-75"
              src="https://i.ibb.co.com/k221BVK7/unnamed.png"
              alt=""
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
          <div>
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
          <div>
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

          {/* Newsletter */}
          <div>
            <h6 className="font-semibold mb-4 text-lg">
              UniMart Industries Ltd.
            </h6>
            <form className="space-y-2">
              <label className="text-sm">Enter your email address</label>
              <div className="flex pt-1">
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="border border-gray-600 rounded-l-md pl-3 pr-6 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gray-700 opacity-80 text-white rounded-r-md px-2 py-2 font-semibold hover:bg-gray-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <div className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="text-gray-100  w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex justify-center items-center"
                >
                  <Facebook size={24} />
                </a>
                

                <a
                  href="#"
                  className="text-gray-100  w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex justify-center items-center"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-300  w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex justify-center items-center"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="opacity-55 pt-16 pb-8">
          <hr />
        </div>
        <p className="text-center opacity-55">
          UniMart © 2025 Demo Store. All Rights Reserved. Designed by
          Smartaddons
        </p>
      </footer>
    </>
  );
}
