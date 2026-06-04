import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const StatsHome = () => {
  const [teacherCount, setTeacherCount] = useState(0);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users-stat`
      );
      return data;
    },
  });

  const { data: allClasses } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/allClasses`
      );
      return data;
    },
  });

  const { data: allTeachers } = useQuery({
    queryKey: ["all-teacher"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-teacher`
      );
      // Filter teachers and update count
    const teachers = Array.isArray(data) ? data : [];
setTeacherCount(teachers.length);
      return data;
    },
  });

  return (
    <div id="stats" className="my-16 px-4 md:px-8 lg:px-20">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Platform Statistics
      </h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <UserGroupIcon className="h-12 w-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-4xl font-bold text-purple-300 mt-3">
            {users?.length || 0}
          </p>
        </div>

        {/* Total Classes */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <AcademicCapIcon className="h-12 w-12 text-fuchsia-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Total Classes</h3>
          <p className="text-4xl font-bold text-fuchsia-300 mt-3">
            {allClasses?.length || 0}
          </p>
        </div>

        {/* Total Teachers */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <AcademicCapIcon className="h-12 w-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            Total Teachers
          </h3>
          <p className="text-4xl font-bold text-indigo-300 mt-3">
            {teacherCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsHome;
