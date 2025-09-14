import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManageCategory() {
  const defaultCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Health & Beauty" },
    { id: 4, name: "Home & Living" },
    { id: 5, name: "Sports" },
  ];

  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || defaultCategories;
  });

  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return alert("Category name required!");
    const exists = categories.find(
      (cat) => cat.name.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) return alert("Category already exists!");
    setCategories([
      ...categories,
      { id: Date.now(), name: newCategory.trim() },
    ]);
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const handleEditCategory = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id) => {
    if (!editingName.trim()) return;
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, name: editingName.trim() } : cat
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className=" p-6 w-[500px] mx-auto mt-10  rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      {/* Add Category */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Category List */}
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            {editingId === cat.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSaveEdit(cat.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(cat.id, cat.name)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
