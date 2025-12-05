import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import ConfirmModal from "./ConfirmModal";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.designs);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    await dispatch(logout());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="text-center">
          <p className="text-xl text-gray-400">
            Please login to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* User Info Section */}
          <div className="p-8 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Total Designs</div>
                <div className="text-3xl font-bold text-indigo-400">
                  {items.length}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Account Status</div>
                <div className="text-lg font-semibold text-green-400">
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Actions
            </h3>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.slice(0, 5).map((design) => (
                <div
                  key={design._id}
                  className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <p className="text-white font-medium">{design.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(design.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No designs created yet. Start creating!
            </p>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to logout? You will need to login again to access your designs."
        confirmText="Logout"
        cancelText="Stay Logged In"
        type="warning"
      />
    </div>
  );
};

export default Profile;
