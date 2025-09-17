import { useGetAllCategoriesQuery } from "../../../redux/app/services/category/categoryApi";
import AddProduct from "./AddProduct";

export default function AddProductPage() {
  const { data: categories } = useGetAllCategoriesQuery();
  
  console.log(categories.data);

  return (
    <div className="p-6">
      <AddProduct categories={categories.data} />
    </div>
  );
}
