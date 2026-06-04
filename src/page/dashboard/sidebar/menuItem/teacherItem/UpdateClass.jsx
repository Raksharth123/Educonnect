/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateClass = ({ classItem, onClose }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axios.put(
        `${import.meta.env.VITE_API_URL}/class/${classItem._id}`,
        updatedData
      );
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Your class has been updated.", "success");
      queryClient.invalidateQueries(["myClasses"]); // Invalidate the cache
      onClose(); // Close the modal
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update the class.", "error");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedData = {
      title: form.title.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      image: form.image.value,
      // Include other fields if needed
    };

    updateMutation.mutate(updatedData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Class</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            defaultValue={classItem.publisher.name}
            name="name"
            className="input input-bordered w-full mb-4"
            placeholder="Teacher Name"
            readOnly
          />
          <input
            type="text"
            defaultValue={classItem.publisher.email}
            name="email"
            className="input input-bordered w-full mb-4"
            placeholder="Teacher Email"
            readOnly
          />
          <input
            type="text"
            name="image"
            className="input input-bordered w-full mb-4"
            placeholder="Image URL"
          />

          <input
            type="text"
            defaultValue={classItem.title}
            name="title"
            className="input input-bordered w-full mb-4"
            placeholder="Class Title"
          />
          <input
            type="number"
            defaultValue={classItem.price}
            name="price"
            className="input input-bordered w-full mb-4"
            placeholder="Price"
          />
          <textarea
            defaultValue={classItem.description}
            name="description"
            className="input input-bordered w-full mb-4"
            placeholder="Description"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
