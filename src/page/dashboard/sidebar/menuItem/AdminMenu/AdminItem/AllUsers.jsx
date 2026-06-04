import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      return data;
    },
  });

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users || []);
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/search`, {
          params: { query: searchQuery },
        })
        .then((res) => setFilteredUsers(res.data))
        .catch((err) => console.error("Error searching users:", err));
    }
  }, [searchQuery, users]);

  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  if (error) {
    return <div className="text-red-500">Error loading users</div>;
  }

  const handleMakeAdmin = (user) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            timer: 1500,
            title: `${user.name} is an Admin now.`,
            text: "User updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => console.error("Error making admin:", err));
  };

  const handleDelete = (user) => {
    Swal.fire({
      position: "top-center",
      timer: 1500,
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Total Users: {users.length}
      </h2>
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full dark:bg-gray-800 dark:text-white">
          <thead className="dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="dark:border-gray-700">
                <td className="font-medium">{index + 1}</td>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border dark:border-gray-500"
                  />
                </td>
                <td className="font-medium">{user.name}</td>
                <td className="dark:text-gray-300">{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <FaUser className="text-xl text-blue-500" />
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg dark:bg-orange-600 dark:hover:bg-orange-700"
                      disabled={user.role === "admin"}
                    >
                      <FaUser className="text-xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost dark:text-red-400 dark:hover:bg-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
