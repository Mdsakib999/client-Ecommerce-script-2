import { useEffect, useState } from "react";
import { Search, User, Ban, Shield, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/app/services/user/userApi";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";
import confirmToast from "../../../utils/confirmToast";
import Loader from "../../../utils/Loader";
import Pagination from "../common/Pagination";

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data: currentUserData } = useUserInfoQuery();
  const currentUser = currentUserData?.data;

  const params = {
    sort: "-createdAt",
    page,
    limit: 6,
    ...(searchTerm.trim() && { searchTerm: searchTerm.trim() }),
  };

  const { data: usersData, isLoading } = useGetAllUsersQuery(params);
  const [updateUser] = useUpdateUserMutation();

  const users = usersData?.data || [];

  const meta = usersData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  const handleRoleChange = (user, newRole) => {
    const isOwnAccount = currentUser?._id === user._id;

    if (isOwnAccount) {
      toast.error("You cannot change your own role!");
      return;
    }

    const roleText = newRole === "ADMIN" ? "Admin" : "Customer";

    confirmToast({
      message: `Are you sure you want to make ${user.name} a ${roleText}?`,
      onConfirm: async () => {
        try {
          await updateUser({
            userId: user._id,
            userInfo: { role: newRole },
          }).unwrap();
          toast.success(
            <h1 className="font-serif text-center">{`${user.name} is now a ${roleText}`}</h1>
          );
        } catch (error) {
          toast.error(`{"Failed to update role" || ${error?.data?.message}}`);
        }
      },
    });
  };

  const handleBanUser = (user) => {
    const isOwnAccount = currentUser?._id === user._id;

    if (isOwnAccount) {
      toast.error("You cannot ban yourself!");
      return;
    }

    confirmToast({
      message: `Are you sure you want to ban ${user.name}?`,
      onConfirm: async () => {
        try {
          await updateUser({
            userId: user._id,
            userInfo: { isBanned: true },
          }).unwrap();
          toast.success(
            <h1 className="font-serif text-center">{`${user.name} has been banned`}</h1>
          );
        } catch (error) {
          toast.error(`{"Failed to ban user" || ${error?.data?.message}}`);
        }
      },
    });
  };

  const handleUnBanUser = (user) => {
    confirmToast({
      message: `Are you sure you want to unban ${user.name}?`,
      onConfirm: async () => {
        try {
          await updateUser({
            userId: user._id,
            userInfo: { isBanned: false },
          }).unwrap();
          toast.success(
            <h1 className="font-serif text-center">
              {`${user.name} has been unbanned`}
            </h1>
          );
        } catch (error) {
          toast.error(`{"Failed to unban user" || ${error?.data?.message}}`);
        }
      },
    });
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
              <p className="text-gray-600 mt-1">{meta.total} users found</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => {
                  const isOwnAccount = currentUser?._id === user._id;

                  return (
                    <tr
                      key={user._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        isOwnAccount ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {user.name}
                              {isOwnAccount && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          title="Change Role"
                          onClick={() =>
                            handleRoleChange(
                              user,
                              user.role === "ADMIN" ? "CUSTOMER" : "ADMIN"
                            )
                          }
                          disabled={isOwnAccount}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                            user.role === "ADMIN"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          } ${
                            isOwnAccount
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {user.role === "ADMIN" ? (
                            <ShieldCheck className="w-3 h-3" />
                          ) : (
                            <Shield className="w-3 h-3" />
                          )}
                          {user.role}
                        </button>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-sm ${
                            user.isBanned
                              ? "bg-red-200 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.isBanned ? "Banned" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {user.isBanned ? (
                            <button
                              onClick={() => handleUnBanUser(user)}
                              disabled={isOwnAccount}
                              className={`p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors ${
                                isOwnAccount
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              title="UnBan user"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBanUser(user)}
                              disabled={isOwnAccount}
                              className={`p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors ${
                                isOwnAccount
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              title="Ban user"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta.totalPage > 1 && (
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
      </div>
    </div>
  );
}
