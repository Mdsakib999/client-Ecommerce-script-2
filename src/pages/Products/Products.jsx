import { useState } from "react";
import Product from "./Product";

const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 1299.99,
    discountPrice: 1199.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    color: ["Natural Titanium", "Blue", "Silver", "Black"],
    rating: 4.8,
    inStock: true,
    description:
      "The Apple iPhone 15 Pro Max is Apple’s most advanced smartphone yet, built with aerospace-grade titanium for strength and reduced weight. It features a stunning 6.7-inch Super Retina XDR display with ProMotion for smoother visuals and ultra-bright performance. Powered by the A17 Pro chip, it delivers unmatched speed, power efficiency, and graphics capabilities for gaming and multitasking. The advanced triple-camera system includes a 48MP main camera, telephoto lens, and ultra-wide, capturing breathtaking photos and videos in all lighting conditions. With 5G connectivity, iOS 17, and all-day battery life, the iPhone 15 Pro Max redefines premium smartphones for professionals and enthusiasts alike."
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Smartphones",
    price: 1099.99,
    discountPrice: 999.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=300&h=300&fit=crop",
    color: ["Obsidian", "Porcelain", "Bay Blue"],
    rating: 4.6,
    inStock: true,
    description:
      "The Google Pixel 8 Pro is designed to deliver the best of Android with Google’s clean software and AI-driven performance. Equipped with the Google Tensor G3 chip, it offers cutting-edge AI features such as enhanced voice recognition, live translation, and advanced photo editing tools like Magic Eraser. Its 6.7-inch LTPO OLED display supports adaptive refresh rates up to 120Hz for smooth scrolling and vivid visuals. The Pixel 8 Pro’s triple camera system, led by a powerful 50MP sensor, captures incredible details, while Night Sight and Real Tone ensure accurate photos in any condition. With long software support, it’s built to last."
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 849.99,
    discountPrice: 749.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    color: ["Graphite", "Blue", "White"],
    rating: 4.4,
    inStock: true,
    description:
      "The Xiaomi 14 Pro combines high-end performance with sleek design at a competitive price point. Featuring a large AMOLED display with vibrant colors and a 120Hz refresh rate, it ensures immersive visuals whether for gaming, streaming, or browsing. Powered by the Snapdragon 8 Gen 3 chipset, it offers blazing-fast performance and efficient multitasking. The advanced Leica-engineered camera system includes a 50MP primary lens, telephoto zoom, and ultra-wide sensor for professional-grade photography. With fast charging, long-lasting battery, and MIUI optimization, the Xiaomi 14 Pro balances premium features with affordability, making it an excellent choice for users seeking flagship performance without breaking the bank."
  },
  {
    id: 7,
    name: "Huawei Mate 60 Pro",
    brand: "Huawei",
    category: "Smartphones",
    price: 999.99,
    discountPrice: 899.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    color: ["Black", "White", "Purple"],
    rating: 4.2,
    inStock: true,
    description:
      "The Huawei Mate 60 Pro is a powerhouse flagship built with innovative design and powerful internals. Featuring a large OLED display with ultra-high resolution and adaptive refresh rate, it ensures smooth visuals and crystal-clear clarity. Its cutting-edge processor and optimized HarmonyOS provide lightning-fast performance and energy efficiency. The camera system, developed with Huawei’s imaging expertise, offers stunning detail with its high-resolution sensors and AI-enhanced image processing. Built-in satellite communication support enhances connectivity in remote areas. With long-lasting battery, superfast charging, and premium materials, the Huawei Mate 60 Pro sets new standards for smartphones that blend style, innovation, and reliable performance."
  },
  {
    id: 8,
    name: "Asus ROG Phone 7",
    brand: "Asus",
    category: "Gaming Phones",
    price: 1099.99,
    discountPrice: 949.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    color: ["Phantom Black", "Storm White"],
    rating: 4.6,
    inStock: true,
    description:
      "The Asus ROG Phone 7 is a gaming powerhouse designed specifically for mobile gamers who demand performance and style. Featuring a 6.78-inch AMOLED display with a 165Hz refresh rate and ultra-low touch latency, it delivers a flawless gaming experience. Powered by the Snapdragon 8 Gen 2 processor and advanced cooling systems, it prevents overheating during extended sessions. The massive 6000mAh battery supports fast charging, ensuring uninterrupted play. Its AirTrigger controls provide console-like precision, while the dual front-facing speakers deliver immersive audio. With RGB lighting, customizable gaming modes, and durable build quality, the ROG Phone 7 is the ultimate gaming companion."
  },
  {
    id: 10,
    name: "Motorola Edge 40 Pro",
    brand: "Motorola",
    category: "Smartphones",
    price: 899.99,
    discountPrice: 799.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    color: ["Lunar Blue", "Stardust White"],
    rating: 4.1,
    inStock: true,
    description:
      "The Motorola Edge 40 Pro combines sleek design with flagship-level features, offering a well-balanced smartphone experience. Its curved 6.67-inch OLED display supports a 165Hz refresh rate, ensuring smooth scrolling and excellent color reproduction. Powered by the Snapdragon 8 Gen 2 chipset, it offers fast performance for everyday use, gaming, and multitasking. The triple-camera system delivers sharp and vibrant photos, with AI enhancements improving low-light and motion shots. With Motorola’s near-stock Android interface, users enjoy a clean and fast UI. Its fast-charging capability, durable build, and stylish design make the Motorola Edge 40 Pro a reliable and modern choice."
  }
];


export default function Products() {
  const [selectedColor, setSelectedColor] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [searchTerm, setSearchTerm] = useState(""); 

  // Filter by color
  const filteredByColor = products.filter((product) =>
    selectedColor ? product.color.includes(selectedColor) : true
  );

  // Filter by search term
  const filteredProducts = filteredByColor.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4">
      {/* Sidebar */}
      <aside className="bg-white p-5 rounded-xl shadow-md w-full md:w-64 space-y-4 h-60 mt-2 border border-amber-100">
        {/* Section Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold tracking-tight">Search & Filter</h3>
          <div className="h-[3px] w-10 bg-red-600 mt-1" />
        </div>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600"
          /> {/* ✅ Added search box */}
        </div>

        {/* Filter by Color */}
        <div>
          <select
            className="select select-bordered w-full border border-gray-300 px-2 py-1 rounded-xl"
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
            className="select select-bordered w-full border border-gray-300 px-2 py-1 rounded-xl "
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 flex-1">
        {sortedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
