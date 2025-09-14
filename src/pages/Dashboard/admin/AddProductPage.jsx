import { useState } from "react";
import AddProduct from "./AddProduct";
import ManageCategory from "./ManageCategory";

export default function AddProductPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Smartphones" },
    { id: 2, name: "Gaming Phones" },
    { id: 3, name: "Clothes" },
    { id: 4, name: "Cosmetics" },
  ]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Product Management</h1>

      {/* Category Management */}
      <ManageCategory categories={categories} setCategories={setCategories} />

      {/* Add Product */}
      <AddProduct categories={categories} />
    </div>
  );
}
