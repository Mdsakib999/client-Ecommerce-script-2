import AddProduct from "./AddProduct";

export default function AddProductPage() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  return (
    <div className="p-6">
      <AddProduct categories={categories} />
    </div>
  );
}
