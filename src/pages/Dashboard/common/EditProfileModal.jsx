import { Plus, X } from "lucide-react";
import { useRef } from "react";

export default function EditProfileModal({
  editProfile,
  editImage,
  loginMethod,
  openModal,
  setOpenModal,
  setEditProfile,
  setEditImage,
  handleSave,
}) {
  const fileInputRef = useRef(null);

  if (!openModal) return null;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditImage(imageUrl);
    }
  };

  const handleRemoveImage = () => setEditImage("");

  const handleCancel = () => {
    setOpenModal(false);
    setEditImage(editProfile.picture);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-slideIn">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 rounded-full shadow-md cursor-pointer overflow-hidden border-2 border-gray-300 flex items-center justify-center transition hover:scale-105"
            >
              {editImage ? (
                <img
                  src={editImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Plus size={48} className="text-gray-400" />
              )}
            </div>
            {editImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-gray-700 text-lg py-0 px-3 rounded-2xl border hover:bg-gray-100 cursor-pointer"
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={editProfile.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={editProfile.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={editProfile.phone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={editProfile.address}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password (if not Google login) */}
          {loginMethod !== "google" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={editProfile.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={editProfile.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
