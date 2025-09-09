import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export default function Product({ product }) {
  return (
    <>
      <div key={product.id} className="px-2 flex-shrink-0">
        <div className="p-3">
          <div className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
            {product.discountPrice && (
              <div className="absolute top-1 left-0 opacity-85 bg-red-800 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                SALE
              </div>
            )}
            <div className="p-4 flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="w-full text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <div className="flex justify-center items-baseline space-x-2 ">
                  {product.discountPrice ? (
                    <>
                      <p className="text-lg font-bold text-red-500">
                        ${product.discountPrice}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ${product.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">
                      ${product.price}
                    </p>
                  )}
                </div>
                <div className="pt-3 flex gap-2">
                  {/* Add to Cart Button */}
                  <button className="w-1/2 bg-gray-200 rounded-full py-2 px-2 font-semibold cursor-pointer text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white">
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    className="w-1/2 bg-blue-500 text-white rounded-full cursor-pointer py-2 px-2 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-blue-600"
                  >
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
