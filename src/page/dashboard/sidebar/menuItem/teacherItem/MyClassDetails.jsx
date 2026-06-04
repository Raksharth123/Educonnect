import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const MyClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: classDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-classes/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  if (error) {
    return <p>Error fetching class details</p>;
  }

  //handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const title = form.title.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const date = form.date.value;

    const assignmentData = {
      name,
      title,
      description,
      marks,
      date,
    };

    try {
      // Send the PATCH request to update the class with the new assignment
      const response = await axiosSecure.patch(
        `/my-classes/${id}/assignments`,
        assignmentData
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // Close the modal after submission
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div>
      {/* all stats */}
      <div>
        <h1>Create Assignments Here</h1>
        <div className="rounded-lg flex flex-wrap justify-evenly items-center border-2 border-black h-16 w-full mx-auto ">
          <div className="bg-gray-300 h-14 w-1/4 ">
            <h2 className="text-center text-xl font-semibold">
              Total Assignments:{" "}
            </h2>
          </div>
          <div className="bg-gray-300 h-14 w-1/4">
            <h2 className="text-center text-xl font-semibold">
              Total Enrollments:- {classDetails?.enroll}
            </h2>
          </div>
          <div className="bg-gray-300 h-14 w-1/4 ">
            <h2 className="text-center text-xl font-semibold">
              Total Submits:
            </h2>
          </div>
        </div>
        <div>
          {/* button to open and close the modal */}
          <div className="my-6">
            <button
              onClick={() => setModalIsOpen(true)}
              className="btn btn-primary"
            >
              Create Assignment
            </button>
          </div>
          <div className="w-1/2">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              appElement={document.getElementById("root")}
              style={{
                content: {
                  width: "400px", // Set the desired width
                  height: "400px", // Set the desired height
                  margin: "auto", // Center the modal
                },
              }}
              contentLabel="Create Assignment"
            >
              <h2>Create New Assignment</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  {/* assignment Title */}
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Name</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      readOnly
                      defaultValue={user?.displayName}
                      className="input text-gray-300 input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Assignment Title</span>
                    </div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>
                  {/* Description */}
                  <label className="form-control w-full max-w-xs">
                    <textarea
                      placeholder="Description"
                      name="description"
                      className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                    ></textarea>
                    <div className="label"></div>
                  </label>
                  {/* marks */}
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Assignment Marks</span>
                    </div>
                    <input
                      type="number"
                      name="marks"
                      placeholder="Marks"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>
                  {/* date and time */}
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Assignment Deadline</span>
                    </div>
                    <input
                      type="date"
                      name="date"
                      placeholder="Type here"
                      className="input text-gray-300 input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>
                </div>

                <button type="submit" className="btn btn-success">
                  Create Assignment
                </button>
                <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="btn btn-secondary ml-2"
                >
                  Cancel
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassDetails;
