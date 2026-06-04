import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassCard from "./ClassCard";
import UpdateClass from "./UpdateClass"; // Import the new component
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get logged-in user data
  const [selectedClass, setSelectedClass] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user-specific classes
  const { data: classItems, isLoading } = useQuery({
    queryKey: ["myClasses", user.email], // Add user email to query key
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-classes/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Fetch only if user email is available
  });

  const deleteMutation = useMutation({
    mutationFn: (classId) =>
      axiosSecure.delete(`${import.meta.env.VITE_API_URL}/class/${classId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses", user?.email]);
      Swal.fire("Deleted!", "Your class has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the class.", "error");
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  const handleUpdateClick = (classItem) => {
    setSelectedClass(classItem);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(classId);
      }
    });
  };

  const handleSeeDetailsClick = (classItem) => {
    navigate(`/dashboard/my-class/${classItem}`);
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classItems?.map((classItem) => (
          <ClassCard
            key={classItem._id}
            classItem={classItem}
            onUpdate={handleUpdateClick}
            onDelete={handleDeleteClick}
            onSeeDetails={handleSeeDetailsClick}
          />
        ))}
      </div>

      {isUpdateModalOpen && selectedClass && (
        <UpdateClass classItem={selectedClass} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default MyClass;
