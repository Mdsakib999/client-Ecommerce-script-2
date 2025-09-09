import { useState } from "react";
import Product from "./Product";

const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    price: 1299.99,
    discountPrice: 1199.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    color: ["Natural Titanium", "Blue", "Silver", "Black"],
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 1099.99,
    discountPrice: 999.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=300&h=300&fit=crop",
    color: ["Obsidian", "Porcelain", "Bay Blue"],
    rating: 4.6,
    inStock: true,
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    price: 849.99,
    discountPrice: 749.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    color: ["Graphite", "Blue", "White"],
    rating: 4.4,
    inStock: true,
  },
  {
    id: 7,
    name: "Huawei Mate 60 Pro",
    brand: "Huawei",
    price: 999.99,
    discountPrice: 899.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    color: ["Black", "White", "Purple"],
    rating: 4.2,
    inStock: true,
  },
  {
    id: 8,
    name: "Asus ROG Phone 7",
    brand: "Asus",
    price: 1099.99,
    discountPrice: 949.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    color: ["Phantom Black", "Storm White"],
    rating: 4.6,
    inStock: true,
  },
  {
    id: 10,
    name: "Motorola Edge 40 Pro",
    brand: "Motorola",
    price: 899.99,
    discountPrice: 799.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    color: ["Lunar Blue", "Stardust White"],
    rating: 4.1,
    inStock: true,
  },
];

export default function Products() {
  const [selectedColor, setSelectedColor] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  // Filter by color
  const filteredProducts = products.filter((product) =>
    selectedColor ? product.color.includes(selectedColor) : true
  );

  // Sort by discountPrice
  const sortedProducts = filteredProducts.sort((a, b) =>
    sortOrder === "lowToHigh"
      ? a.discountPrice - b.discountPrice
      : b.discountPrice - a.discountPrice
  );

  // Get unique colors for filter
  const allColors = [...new Set(products.flatMap((product) => product.color))];

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      <aside className="bg-white p-5 rounded-xl shadow-md w-64 space-y-4 mt-2 h-44">
        {/* Section Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold tracking-tight">Search & Filter</h3>
          <div className="h-[3px] w-10 bg-red-600 mt-1" />
        </div>

        {/* Filter by Color */}
        <div>
          <select
            className="select select-bordered w-full border border-gray-300 px-2 py-1 rounded-2xl"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">All Colors</option>
            {allColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by Price */}
        <div>
          <select
            className="select select-bordered w-full border border-gray-300 px-2 py-1 rounded-2xl"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </aside>

      {/* Left Sidebar */}

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {sortedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
