import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { motion } from "framer-motion";

const AllClasses = () => {
  const navigate = useNavigate();
  const { data: allClasses = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allClasses`,
        { timeout: 10000 }
      );
      return data;
    },
    retry: 1,
  });

  const [sortedClasses, setSortedClasses] = useState([]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success w-12 h-12"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Classes could not load
          </h1>
          <p className="text-gray-600 mb-6">
            Please make sure the backend server is running and the API URL is correct.
          </p>
          <p className="text-xs text-gray-400 mb-6 break-words">
            {error?.message}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter approved classes
  const approvedClasses = allClasses.filter(
    (classItem) => classItem.status === "approved"
  );

  // Truncate description to 80 characters for uniform length
  const truncateDescription = (desc = "") => {
    return desc.length > 80 ? `${desc.substring(0, 77)}...` : desc;
  };

  const sortAscending = () => {
    const sorted = [...approvedClasses].sort((a, b) => a.price - b.price);
    setSortedClasses(sorted);
  };

  const sortDescending = () => {
    const sorted = [...approvedClasses].sort((a, b) => b.price - a.price);
    setSortedClasses(sorted);
  };

  // Use sortedClasses if sorting is applied, otherwise use approvedClasses
  const displayClasses =
    sortedClasses.length > 0 ? sortedClasses : approvedClasses;

  return (
    <div className="w-11/12 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        All Classes
      </h1>
      <div className="flex justify-end mb-6 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sortAscending}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
        >
          <FaSortAmountUp className="mr-2" /> Ascending Price
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sortDescending}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
        >
          <FaSortAmountDown className="mr-2" /> Descending Price
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayClasses.map((classItem, index) => (
          <motion.div
            key={classItem._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
            }}
            className="relative bg-white p-6 rounded-2xl shadow-lg cursor-pointer border border-gray-100 overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center font-semibold text-lg z-10">
              ${classItem.price}
            </div>
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-52 object-cover rounded-xl mb-4 transition-transform duration-300"
            />
            <h2 className="text-xl text-gray-800 font-bold mb-3">
              {classItem.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Teacher: {classItem.publisher?.name || "Unknown"}
            </p>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {truncateDescription(classItem.description)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Total Enrolment: {classItem.enroll}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              onClick={() => navigate(`/class/${classItem._id}`)}
            >
              Enroll Now
            </motion.button>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
