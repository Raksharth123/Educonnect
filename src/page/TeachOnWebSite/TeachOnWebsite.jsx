import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TeachOnWebsite = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "",
    experience: "beginner",
  });

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "Data Science",
    "Mobile App Development",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      email: user?.email,
      photoURL: user?.photoURL,
    };

    try {
      const response = await axiosSecure.post("/teacher-req", dataToSubmit);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your application has been submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          name: "",
          title: "",
          category: "",
          experience: "beginner",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen   flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-2xl">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-blue-100/30 rounded-2xl -z-10"></div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Join Our Teaching Community
          </h1>
          <p className="text-gray-500">
            Share your expertise and inspire learners worldwide
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md object-cover"
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <div className="absolute inset-0 rounded-full border-2 border-indigo-300/50 animate-pulse"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm text-black font-medium  mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 rounded-lg   transition-colors duration-200 text-black bg-white border border-gray-300 "
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field (Read-only) */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              value={user?.email || "Not available"}
              readOnly
            />
          </div>

          {/* Title Field */}
          <div className="relative">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-colors duration-200 bg-white text-black"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your course title"
              required
            />
          </div>

          {/* Experience Field */}
          <div className="relative">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience Level
            </label>
            <select
              id="experience"
              name="experience"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none bg-white text-gray-800"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-Level</option>
              <option value="experienced">Experienced</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Category Field */}
          <div className="relative">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 appearance-none bg-white text-gray-800"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
          >
            Submit for Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeachOnWebsite;
