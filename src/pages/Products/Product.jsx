// components/Product.jsx
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../redux/app/features/cart/cartSlice";
import toast from "react-hot-toast";

export default function Product({ product }) {
  const cartItems = useSelector((state) => state.cart.items);
  const existingItem = cartItems.find((item) => item._id === product._id);

  // existingItem?.cartQuantity is how many user added already
  const hasReachedStock =
    existingItem && existingItem.cartQuantity >= product.quantity;
  const isInCart = !!existingItem;

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (hasReachedStock) {
      toast.error("Out of stock — you’ve added all available items");
      return;
    }

    dispatch(addToCart(product));

    if (!isInCart) {
      toast.success(<h1 className="text-center font-serif">Added to cart</h1>);
    } else {
      toast(<h3 className="text-center font-serif">Quantity increased</h3>, {
        icon: "🛒",
        position: "bottom-right",
      });
    }
  };

  return (
    <Link key={product?._id} to={`/product/${product?._id}`}>
      <div className="w-full mx-auto max-w-96 bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
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
            <p className="text-sm text-gray-500 mb-1">{product?.category}</p>
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
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={hasReachedStock}
                className={`w-full cursor-pointer rounded-full py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors ${
                  hasReachedStock
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isInCart
                    ? "bg-emerald-400 text-white hover:bg-emerald-500"
                    : "bg-gray-200 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <ShoppingCart size={16} />
                <span>
                  {hasReachedStock
                    ? "Out of Stock"
                    : isInCart
                    ? "Added ✓"
                    : "Add to Cart"}
                </span>
              </button>
            </div>
            {/* <div className="mt-2 text-xs text-gray-500">
              {product.quantity > 0
                ? `In stock: ${product.quantity}`
                : "Out of stock"}
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
