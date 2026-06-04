import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa"; // React Icons

const AllReqClass = () => {
  // Fetch data using useQuery
  const {
    data: allClasses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allClasses`
      );
      return data;
    },
  });

  const handleApprove = (classItem) => {
    const updateState = {
      status: "approved",
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/allClasses/approve/${classItem._id}`,
        updateState
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            timer: 1500,
            title: `${classItem.status}  now.`,
            text: "Approved successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => console.error("Error making approved:", err));
  };
  const handleReject = (classItem) => {
    const updateState = {
      status: "rejected",
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/allClasses/rejected/${classItem._id}`,
        updateState
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            timer: 1500,
            title: `${classItem.status}  now.`,
            text: "Rejected successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => console.error("Error making approved:", err));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading classes.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">All Requested Classes</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Short Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allClasses.map((classItem) => (
              <tr key={classItem._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{classItem.title}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">
                  {classItem.publisher.email}
                </td>
                <td className="px-4 py-2 border">{classItem.description}</td>
                <td className="px-4 py-2 border">${classItem.price}</td>
                <td className="px-4 py-2 border">
                  {classItem.status === "approved" ? (
                    <span className="text-green-600">Accepted</span>
                  ) : classItem.status === "rejected" ? (
                    <span className="text-red-600">Rejected</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </td>
                <td className="px-4 flex flex-col justify-between items-center py-2 border space-x-2">
                  {!classItem.status || classItem.status === "Pending" ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={() => handleApprove(classItem)}
                      >
                        <FaCheck className="mr-1" />
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={() => handleReject(classItem)}
                      >
                        <FaTimes className="mr-1" />
                      </button>
                    </>
                  ) : (
                    <FaCheck></FaCheck>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReqClass;
