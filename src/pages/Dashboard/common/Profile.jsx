import { useState } from "react";
import { UserPen, X } from "lucide-react";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);

  // Fake user data (normally from API/backend)
  const [profile, setProfile] = useState({
    fullName: "Nur Mohammad Imon",
    email: "imon@gmail.com",
    phone: "+880 17XXXXXX",
    address: "GEC More, Chattogram",
    password: "",
    confirmPassword: "",
  });

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
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left sidebar */}
        <div className="w-full md:w-1/3 bg-gray-100 flex flex-col items-center p-6">
          <img
            className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-md"
            src="https://i.ibb.co.com/KpXYj7mF/2025.jpg"
            alt="Profile"
          />
          <h4 className="mt-4 text-base md:text-lg font-semibold text-center">
            {profile.fullName}
          </h4>
          <p className="text-gray-600 text-sm">{profile.email}</p>
          <p className="text-gray-600 text-sm">{profile.phone}</p>
          <p className="text-gray-700 mt-2 text-sm text-center">
            {profile.address}
          </p>
        </div>

        {/* Right content */}
        <div className="w-full md:w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl md:text-2xl text-gray-800">
              My Profile
            </h1>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <UserPen size={18} />
              Edit
            </button>
          </div>
          <hr className="mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                <p className="text-base md:text-lg font-semibold text-gray-800">
                  {profile.fullName}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Address</h2>
                <p className="text-base md:text-lg text-gray-700">
                  {profile.address}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-base md:text-lg text-gray-700">
                  {profile.email}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h2>
                <p className="text-base md:text-lg text-gray-700">
                  {profile.phone}
                </p>
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
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
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
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
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
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
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
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                />
              </div>

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
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
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
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-sm md:text-base"
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
