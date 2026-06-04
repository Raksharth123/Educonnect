import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUserProfile = async () => {
    const response = await axiosSecure.get(
      `${import.meta.env.VITE_API_URL}/user`
    );
    return response.data;
  };

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["userProfile"], queryFn: fetchUserProfile });

  const [additionalInfo, setAdditionalInfo] = useState({
    phone: "",
    address: "",
    bio: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedInfo = localStorage.getItem("additionalInfo");
    if (storedInfo) {
      setAdditionalInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleInputChange = (e) => {
    setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("additionalInfo", JSON.stringify(additionalInfo));
    setIsEditing(false);
    setFieldToEdit("");
  };

  const openEditModal = (field) => {
    setFieldToEdit(field);
    setIsEditing(true);
  };

  if (isLoading || !profileData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner text-blue-500 w-12 h-12"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg font-medium">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6"
      >
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-blue-100 overflow-hidden mb-4">
            <img
              src={profileData.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {profileData.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            UserId: {profileData._id?.slice(0, 24)}
          </p>
          <div className="mt-6">
            <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
              Profile Info
            </button>
          </div>
        </div>

        {/* Main Profile Info */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{profileData.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-800">No username</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{profileData.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Location</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">
                  {additionalInfo.location || "Dhaka, Bangladesh"}
                </p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="cursor-pointer"
                  onClick={() => openEditModal("location")}
                >
                  <FaEdit className="text-blue-500 hover:text-blue-600" />
                </motion.div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Address</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">
                  {additionalInfo.address || "N/A"}
                </p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="cursor-pointer"
                  onClick={() => openEditModal("address")}
                >
                  <FaEdit className="text-blue-500 hover:text-blue-600" />
                </motion.div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Bio</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">
                  {additionalInfo.bio || "Hey kiddo"}
                </p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="cursor-pointer"
                  onClick={() => openEditModal("bio")}
                >
                  <FaEdit className="text-blue-500 hover:text-blue-600" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditing && fieldToEdit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4 capitalize">
              Edit {fieldToEdit}
            </h2>
            <input
              type="text"
              name={fieldToEdit}
              value={additionalInfo[fieldToEdit] || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder={`Enter your ${fieldToEdit}`}
            />
            <div className="flex justify-end mt-6 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Save
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyProfile;
