import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../redux/app/services/user/userApi";
import toast from "react-hot-toast";

export default function EditProfileModal({
  editProfile,
  editImage,
  // loginMethod,
  openModal,
  setOpenModal,
  setEditImage,
  handleSave,
}) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: editProfile.name,
      email: editProfile.email,
      phone: editProfile.phone || "",
      address: editProfile.address || "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      name: editProfile.name,
      email: editProfile.email,
      phone: editProfile.phone || "",
      address: editProfile.address || "",
      password: "",
      confirmPassword: "",
    });
  }, [editProfile, reset]);

  if (!openModal) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setEditImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setEditImage("");
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditImage(editProfile.picture);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Only append editable fields
    if (data.name) formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.address) formData.append("address", data.address);
    if (data.password) formData.append("password", data.password);

    if (selectedImage) formData.append("image", selectedImage);

    try {
      const result = await updateUser({
        userId: editProfile._id,
        userInfo: formData,
      }).unwrap();

      if (result.success) {
        handleSave({
          ...editProfile,
          ...data,
          picture: editImage || editProfile.picture,
        });
        toast.success(
          <h1 className="font-serif">Profile updated successfully</h1>,
          {
            position: "bottom-right",
          }
        );
        setOpenModal(false);
      }
    } catch {
      toast.error(<h1 className="font-serif">Profile update failed</h1>, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div
      onClick={() => setOpenModal(!openModal)}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 px-4"
      style={{ minHeight: 0 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          disabled={isLoading}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            <div
              onClick={() => !isLoading && fileInputRef.current.click()}
              className={`w-28 h-28 rounded-full shadow-lg cursor-pointer overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition transform hover:scale-105 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {editImage ? (
                <img
                  src={editImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Plus size={40} className="text-gray-400" />
              )}
            </div>
            {editImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-3 text-sm text-gray-600 hover:text-red-500 transition"
                disabled={isLoading}
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name", {
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={editProfile.email}
              disabled
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address", {
                maxLength: {
                  value: 100,
                  message: "Address cannot exceed 100 characters",
                },
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password */}
          {/* TODO */}
          {/* {loginMethod !== "google" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password must contain uppercase, lowercase & number",
                    },
                  })}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    validate: (value, { password }) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )} */}

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-x-2">
                  <div className="w-4 h-4 border-2 border-t-white border-gray-200 rounded-full animate-spin"></div>
                  <span>updating...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
