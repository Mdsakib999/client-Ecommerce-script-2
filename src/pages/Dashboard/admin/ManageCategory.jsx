import { useState } from "react";
import { Plus, Search, Edit, Trash2, Save, X } from "lucide-react";

export default function ManageCategory({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Add Category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return alert("Category name required!");
    const exists = categories.find(
      (cat) => cat.name.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) return alert("Category already exists!");

    setCategories([...categories, { id: Date.now(), name: newCategory.trim() }]);
    setNewCategory("");
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // Start Edit
  const handleEditCategory = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  // Save Edit
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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

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

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category List */}
      <ul className="space-y-3">
        {filteredCategories.map((cat) => (
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
