import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../redux/app/features/cart/cartSlice";

export default function Product({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log(product);
    console.log("HHHHHHHHHH");
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product?._id}`}>
      <div key={product?.id} className="px-2 flex-shrink-0">
        <div className="p-3">
          <div className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
            {product?.discountPrice && (
              <div className="absolute top-1 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                SALE
              </div>
            )}
            <div className="p-4 flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="w-full text-center">
                <p className="text-sm text-gray-500 mb-1">
                  {product?.category}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product?.name.slice(0, 25)}
                </h2>
                <div className="flex justify-center items-baseline space-x-2">
                  {product?.discountPrice ? (
                    <>
                      <p className="text-lg font-bold text-red-500">
                        ${product?.discountPrice}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ${product?.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">
                      ${product?.price}
                    </p>
                  )}
                </div>
                <div className="pt-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        e.stopPropagation(),
                        handleAddToCart(product);
                    }}
                    className="w-full cursor-pointer bg-gray-200 rounded-full py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
