import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../redux/app/services/category/categoryApi";
import toast from "react-hot-toast";
import confirmToast from "../../../utils/confirmToast";

export default function ManageCategory() {
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

  // --- Handlers ---
  const handleAddCategory = async () => {
    if (!newCategory.trim())
      return toast.error(
        <h1 className="font-serif">Category name required</h1>
      );
    try {
      const result = await addCategory({ name: newCategory.trim() }).unwrap();
      if (result.success) {
        toast.success(<h1 className="font-serif">New category added</h1>, {
          position: "top-right",
        });
        setNewCategory("");
      }
    } catch (err) {
      toast.error(
        <h1 className="font-serif">
          {err?.data?.message || "Failed to add category"}
        </h1>
      );
    }
  };

  const handleDeleteCategory = (id) => {
    confirmToast({
      message: "Do you really want to delete this category?",
      onConfirm: async () => {
        try {
          await deleteCategory(id).unwrap();
          toast.success(
            <h1 className="font-serif">Category deleted successfully</h1>
          );
        } catch (err) {
          toast.error(
            <h1 className="font-serif">
              {err?.data?.message || "Failed to add category"}
            </h1>
          );
        }
      },
    });
  };

  const handleEditCategory = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) return;
    try {
      await updateCategory({
        categoryId: id,
        categoryName: { name: editingName.trim() },
      }).unwrap();
      setEditingId(null);
      setEditingName("");
      toast.success(<h1 className="font-serif">Category updated</h1>);
    } catch (err) {
      toast.error(
        <h1 className="font-serif">
          {err?.data?.message || "Failed to add category"}
        </h1>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Categories
      </h2>

      {/* Add Category */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-red-500">
                  Failed to load categories
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  {/* Name / Edit Field */}
                  <td className="py-3 px-4">
                    {editingId === cat._id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleSaveEdit(cat._id)}
                          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-800">
                        {cat.name}
                      </span>
                    )}
                  </td>

                  {/* Created At */}
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {cat.createdAt
                      ? new Date(cat.createdAt).toLocaleString()
                      : "—"}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    {editingId !== cat._id && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditCategory(cat._id, cat.name)}
                          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
