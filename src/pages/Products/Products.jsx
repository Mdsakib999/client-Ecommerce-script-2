import { useEffect, useState } from "react";
import Product from "./Product";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import { useGetAllCategoriesQuery } from "../../redux/app/services/category/categoryApi";
import Pagination from "../Dashboard/common/Pagination";
import Loader from "../../utils/Loader";

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");

  const params = {
    sort,
    page,
    limit: 6,
    fields: selectedCategories,
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

  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

  if (isProductLoading || isCategoryLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 mt-10">
      {/* Sidebar */}
      <aside className="w-full md:w-64 mx-auto max-w-96 space-y-4">
        {/* Search & Filter */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-300">
          <h3 className="text-lg font-bold tracking-tight mb-3">
            Sort & Filter
          </h3>
          <div className="h-[3px] w-10 bg-blue-500 mb-4" />
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
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
          </select>
        </div>

        {/* Categories (Multi-select checkboxes) */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-300">
          <h3 className="text-lg font-bold tracking-tight mb-3">Category</h3>
          <div className="h-[3px] w-10 bg-blue-500 mb-4" />
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-2 px-2 py-1 rounded border border-gray-200 bg-gray-50 cursor-pointer text-xs hover:bg-blue-50 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.name,
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter(
                          (name) => name !== category.name
                        )
                      );
                    }
                  }}
                  className="accent-blue-500"
                />
                {category.name}
              </label>
            ))}
          </div>
          <button
            onClick={() => setSelectedCategories([])}
            className={`mt-4 px-4 py-1.5 rounded bg-gray-600 text-white text-xs hover:bg-gray-500 transition`}
          >
            Clear All
          </button>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          {products && products.length === 0 ? (
            <div className="flex items-center justify-center col-span-full min-h-[300px]">
              <h1 className="text-center text-2xl text-blue-400">
                No products found! Try resetting filters again.
              </h1>
            </div>
          ) : (
            products.map((product) => (
              <Product key={product?._id} product={product} />
            ))
          )}
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
