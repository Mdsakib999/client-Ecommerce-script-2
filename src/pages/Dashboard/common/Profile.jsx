import { Plus, User, UserPen } from "lucide-react";
import { useState } from "react";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);

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
  });

  const [editProfile, setEditProfile] = useState({
    ...profile,
    password: "",
    confirmPassword: "",
  });

  const [editImage, setEditImage] = useState(profile.picture);

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({ ...editProfile, picture: editImage });
    setOpenModal(false);
    console.log("Updated profile:", { ...editProfile, picture: editImage });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Profile Card */}
        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-gray-100 p-6 flex flex-col items-center md:flex-row md:items-center md:p-8 lg:p-6">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 relative">
              <button
                onClick={() => setOpenModal(true)}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 rounded-full shadow-md cursor-pointer overflow-hidden"
              >
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex justify-center items-center">
                    <User size={46} className="text-gray-500" />
                  </div>
                )}
              </button>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-800">{profile.name}</h4>
              <p className="text-sm text-gray-500">
                {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
              </p>
              <p className="text-sm text-gray-700">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-start sm:items-center mb-6">
            <h1 className="font-bold text-xl text-gray-800 mb-3 sm:mb-0">My Profile</h1>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <UserPen size={18} /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Address</h2>
                {profile.address ? (
                  <p className="text-lg font-semibold text-gray-800">{profile.address}</p>
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
                <h2 className="text-sm font-medium text-gray-500">Phone Number</h2>
                {profile.phone ? (
                  <p className="text-lg font-semibold text-gray-800">{profile.phone}</p>
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

      {/* Edit Modal */}
      <EditProfileModal
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        editImage={editImage}
        setEditImage={setEditImage}
        loginMethod={loginMethod}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSave={handleSave}
      />
    </div>
  );
}
