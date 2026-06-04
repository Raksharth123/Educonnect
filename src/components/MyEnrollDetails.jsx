import { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalFeedBack from "../page/modal/ModalFeedBack";
import {
  FaClipboardList,
  FaFileAlt,
  FaCalendarAlt,
  FaPaperPlane,
  FaCommentDots,
} from "react-icons/fa";

const MyEnrollDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { enrolledClass } = location.state || {};
  const assignment = enrolledClass?.myClass?.assignments;

  if (!assignment) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Assignment is not arrived yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h4 className="text-2xl md:text-3xl text-green-500 font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaClipboardList className="text-green-600" /> My Assignments
      </h4>

      <div className="flex justify-center mb-6">
        <button
          className="btn btn-neutral text-lg md:text-xl flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaCommentDots /> Feedback Us
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm md:text-base">
            <tr>
              <th>#</th>
              <th className="flex items-center gap-1">
                <FaFileAlt /> Title
              </th>
              <th>Description</th>
              <th className="text-center">Marks</th>
              <th className="flex items-center gap-1">
                <FaCalendarAlt /> Deadline
              </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base">
            <tr className="hover:bg-gray-50 transition duration-200">
              <td>1</td>
              <td>{assignment.title}</td>
              <td>{assignment.description}</td>
              <td className="text-center">{assignment.marks}</td>
              <td>{assignment.date}</td>
              <td className="text-center">
                <button className="btn btn-primary btn-sm md:btn-md flex items-center gap-1">
                  <FaPaperPlane /> Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      <ModalFeedBack
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyEnrollDetails;
