import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HighlightedClass = () => {
  const navigate = useNavigate();
  const { data: allClasses, isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allClasses`
      );
      // Make sure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  // Add safety check - if not array, show empty
  if (!Array.isArray(allClasses)) {
    return <div className="text-center text-gray-500">No classes found.</div>;
  }

  const approvedCourses = allClasses.filter(
    (item) => item.status === "approved"
  );

  const sortedCourses = approvedCourses.sort((a, b) => b.enroll - a.enroll);
  const sliceCourse = sortedCourses.slice(0, 6);

  const truncateDescription = (desc) => {
    return desc.length > 80 ? `${desc.substring(0, 77)}...` : desc;
  };

  return (
    <div id="course" className="mt-12 w-11/12 mx-auto">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        All Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliceCourse.map((classItem, index) => (
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
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-400 text-white rounded-full flex items-center justify-center font-semibold text-lg z-10 shadow-lg">
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
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {truncateDescription(classItem.description)}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-fuchsia-750 transition-all duration-200"
              onClick={() => navigate(`/class/${classItem._id}`)}
            >
              Enroll Now
            </motion.button>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-fuchsia-650"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HighlightedClass;