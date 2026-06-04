import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa"; // React Icons
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const TeachersRequest = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch data using useQuery
  const {
    data: allTeacherRequests = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["teacher-req"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/teacher-req`
      );
      return data;
    },
  });

  const handleApprove = (teacherRequest) => {
    const updateState = {
      role: "teacher",
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/teacher-req/approve/${
          teacherRequest._id
        }`,
        updateState
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            timer: 1500,
            title: `${teacherRequest?.role}  now.`,
            text: "Approved successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => console.error("Error making approved:", err));
  };
  const handleReject = (teacherRequest) => {
    const updateState = {
      status: "rejected",
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/teacher-req/rejected/${
          teacherRequest._id
        }`,
        updateState
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            timer: 1500,
            title: `${teacherRequest.status}  now.`,
            text: "Approved successfully.",
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
      <h2 className="text-2xl font-semibold mb-5">
        All Requested For Teaching
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Applied By</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allTeacherRequests.map((teacherRequest) => (
              <tr key={teacherRequest._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{teacherRequest?.name}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={teacherRequest?.photoURL}
                    alt={teacherRequest?.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">
                  {teacherRequest?.experience}
                </td>
                <td className="px-4 py-2 border">{teacherRequest?.title}</td>
                <td className="px-4 py-2 border">
                  ${teacherRequest?.category}
                </td>
                <td className="px-4 py-2 border">
                  {teacherRequest.role === "teacher" ? (
                    <span className="text-green-600">Accepted</span>
                  ) : teacherRequest.role === "rejected" ? (
                    <span className="text-red-600">Rejected</span>
                  ) : (
                    <span className="text-yellow-600">pending</span>
                  )}
                </td>
                <td className="px-4 flex flex-col justify-between items-center py-2 border space-x-2">
                  {!teacherRequest.role || teacherRequest.role === "pending" ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={() => handleApprove(teacherRequest)}
                      >
                        <FaCheck className="mr-1" />
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                        onClick={() => handleReject(teacherRequest)}
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

export default TeachersRequest;
