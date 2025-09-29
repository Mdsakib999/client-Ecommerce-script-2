import { useEffect, useState } from "react";
import { useGetAllProductQuery } from "../../../../redux/app/services/product/productApi";
import { Package, Search } from "lucide-react";
import Loader from "../../../../utils/Loader";
import ProductTable from "./ProductTable";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Pagination from "../../common/Pagination";

export default function ManageProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const params = {
    sort: sort,
    page: page,
    limit: 10,
    ...(searchTerm.trim() && { searchTerm: searchTerm.trim() }),
  };

  const { data: productsData, isLoading } = useGetAllProductQuery(params);

  const products = productsData?.data || [];
  const meta = productsData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeAllModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  // Handle escape key to close modals
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen -z-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">
            Manage your product catalog and inventory
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 flex-1">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-7 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 mt-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-60">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700"
              >
                Sort products:
              </label>
              <select
                id="sort"
                name="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   bg-white focus:outline-none focus:ring-2 focus:ring-blue-600
                   focus:border-blue-600 text-gray-800 cursor-pointer
                   transition duration-150 ease-in-out"
              >
                <option value="price">Price — Low to High</option>
                <option value="-price">Price — High to Low</option>
                <option value="createdAt">Newest First</option>
                <option value="-createdAt">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="-name">Name Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8">
            <Loader />
          </div>
        ) : products.length > 0 ? (
          <>
            <ProductTable
              products={products}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {meta.totalPage > 1 && products.length > 1 && (
              <Pagination
                page={page}
                available={meta.limit}
                total={meta.total}
                totalPage={meta.totalPage}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        ) : (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start by adding your first product"}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ViewProductModal
        product={selectedProduct}
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
      />

      <EditProductModal
        product={selectedProduct}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />

      <DeleteConfirmModal
        product={selectedProduct}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
