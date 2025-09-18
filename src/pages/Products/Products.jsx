import { useState } from "react";
import Product from "./Product";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import { useGetAllCategoriesQuery } from "../../redux/app/services/category/categoryApi";
import Pagination from "../Dashboard/common/Pagination";
import Loader from "../../utils/Loader";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");

  console.log(selectedCategory);
  const params = {
    sort,
    page,
    limit: 6,
    fields: selectedCategory || "",
  };

  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery();

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const meta = productsData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  if (isProductLoading || isCategoryLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-4">
        {/* Search & Filter */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-amber-100">
          <h3 className="text-lg font-bold tracking-tight mb-3">
            Search & Filter
          </h3>
          <div className="h-[3px] w-10 bg-red-600 mb-4" />
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort products:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="price">Price — Low to High</option>
            <option value="-price">Price — High to Low</option>
            <option value="createdAt">Newest First</option>
            <option value="-createdAt">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
          </select>
        </div>

        {/* Categories */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-amber-100">
          <h3 className="text-lg font-bold tracking-tight mb-3">Category</h3>
          <div className="h-[3px] w-10 bg-red-600 mb-4" />
          <button
            onClick={() => setSelectedCategory("")}
            className={`block w-full text-left px-3 py-1 rounded-lg ${
              selectedCategory === ""
                ? "bg-gray-400 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? "" : category.name
                )
              }
              className={`block w-full text-left px-3 py-1 rounded-lg ${
                selectedCategory === category.name
                  ? "bg-gray-400 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products &&
            products?.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
        </div>
        {meta.totalPage > 1 && products.length > 0 && (
          <Pagination
            page={page}
            available={meta?.limit}
            total={meta?.total}
            totalPage={meta?.totalPage}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>
    </div>
  );
}
