import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FiUsers, FiBookOpen } from "react-icons/fi";

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Stats = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users-stat`
      );
      return data;
    },
  });

  const { data: allClasses = [] } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allClasses`
      );
      return data;
    },
  });

  // Chart.js Data
  const pieData = {
    labels: ["Users", "Classes"],
    datasets: [
      {
        label: "Statistics",
        data: [users.length, allClasses.length],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderColor: ["#1E40AF", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Total Users", "Total Classes"],
    datasets: [
      {
        label: "Counts",
        data: [users.length, allClasses.length],
        backgroundColor: ["#6366F1", "#34D399"],
      },
    ],
  };

  return (
    <div id="stats" className="py-10 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-10">
        📊 EduConnect Statistics
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <FiUsers className="text-5xl text-blue-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <FiBookOpen className="text-5xl text-green-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Total Classes</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {allClasses.length}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">
            Pie Chart Overview
          </h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">
            Bar Chart Overview
          </h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
