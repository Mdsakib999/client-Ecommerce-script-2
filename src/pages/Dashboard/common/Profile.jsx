import { Plus, User, UserPen, X } from "lucide-react";
import { useRef, useState } from "react";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

  const { data: userInfo } = useUserInfoQuery();
  const user = userInfo?.data || {};
  const loginMethod = user.auths?.[0]?.provider;

  const { name = "", email = "", picture = "", role } = user;

  const [profile, setProfile] = useState({
    name,
    email,
    picture,
    role,
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, picture: imageUrl }));

      console.log("selected file", file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    setOpenModal(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Profile Card */}
        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-gray-100 p-6 flex flex-col items-center md:flex-row md:items-center md:p-8 lg:p-6">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 relative">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {profile.picture ? (
                <img
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 rounded-full shadow-md cursor-pointer"
                  src={profile.picture}
                  alt="Profile"
                />
              ) : (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="relative cursor-pointer w-24 h-24 border-2 border-gray-500 flex items-center justify-center md:w-28 md:h-28 lg:w-24 lg:h-24 rounded-full shadow-md"
                >
                  <User size={46} className="text-gray-500" />
                </button>
              )}
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-800">
                {profile.name}
              </h4>
              <p className="text-sm text-gray-500">
                {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
              </p>
              <p className="text-sm text-gray-700">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-start sm:items-center mb-6">
            <h1 className="font-bold text-xl text-gray-800 mb-3 sm:mb-0">
              My Profile
            </h1>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <UserPen size={18} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.name}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Address</h2>

                {profile.address ? (
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.address}
                  </p>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-md font-semibold text-gray-700 cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Address
                  </button>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-lg text-gray-700">{profile.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h2>
                {profile.phone ? (
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.phone}
                  </p>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-md font-semibold text-gray-700 cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Number
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {loginMethod === "google" ? (
                <div></div>
              ) : (
                // new and confirm password filed
                <div className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={profile.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
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
      )}
    </div>
  );
}
