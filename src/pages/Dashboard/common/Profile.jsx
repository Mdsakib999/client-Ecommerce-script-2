import {
  Plus,
  ShieldCheck,
  ShieldCheckIcon,
  User,
  UserPen,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const user = useMemo(() => userInfo?.data || {}, [userInfo?.data]);
  // const loginMethod = user.auths?.[0]?.provider;

  const { name = "", email = "", picture = "", role } = user;

  const [profile, setProfile] = useState({
    _id: user?._id,
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

  useEffect(() => {
    setProfile({
      _id: user?._id,
      name: user?.name || "",
      email: user?.email || "",
      picture: user?.picture || "",
      role: user?.role || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditProfile((prev) => ({
      ...prev,
      ...user,
      password: "",
      confirmPassword: "",
    }));
    setEditImage(user.picture || "");
  }, [user]);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditProfile(updatedProfile);
    setEditImage(updatedProfile.picture);
    setOpenModal(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Profile Card */}
        <div className="flex justify-center items-center bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="p-8 flex flex-col items-center md:flex-row md:items-center md:p-10 lg:p-8">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 relative">
              <button
                onClick={() => setOpenModal(true)}
                className="w-28 h-28 md:w-32 md:h-32 lg:w-28 lg:h-28 rounded-full shadow-lg cursor-pointer overflow-hidden transition-transform hover:scale-105"
              >
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-200 rounded-full">
                    <User size={48} className="text-gray-500" />
                  </div>
                )}
              </button>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2 gap-2">
                <p className="text-lg font-bold text-gray-600">
                  {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
                </p>
                {role?.toLowerCase() === "admin" ? (
                  <ShieldCheck size={20} className="text-emerald-600" />
                ) : (
                  <User size={20} className="text-gray-600" />
                )}
              </div>{" "}
              <h4 className="text-xl font-bold text-gray-900">
                {profile.name}
              </h4>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="flex justify-between items-start sm:items-center mb-8">
            <h1 className="font-bold md:text-2xl text-gray-900">My Profile</h1>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center cursor-pointer gap-2 px-5 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              <UserPen size={18} /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                <p className="text-gray-900 text-sm md:text-base">
                  {profile.name}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Address</h2>
                {profile.address ? (
                  <p className="text-gray-900 text-sm md:text-base">
                    {profile.address}
                  </p>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-md font-semibold text-blue-600 cursor-pointer flex items-center gap-1 hover:text-blue-700 transition"
                  >
                    <Plus size={16} /> Add Address
                  </button>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-gray-900 text-sm md:text-base">
                  {profile.email}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h2>
                {profile.phone ? (
                  <p className="text-gray-900 text-sm md:text-base">
                    {profile.phone}
                  </p>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-md font-semibold text-blue-600 cursor-pointer flex items-center gap-1 hover:text-blue-700 transition"
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
        // loginMethod={loginMethod}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSave={handleSave}
      />
    </div>
  );
}
