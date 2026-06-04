import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaStar, FaPaperPlane, FaTimes } from "react-icons/fa";

// Set the root element for accessibility
Modal.setAppElement("#root");

const ModalFeedBack = ({ isOpen, onRequestClose }) => {
  const { user, loading } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const feedbackData = {
      feedback,
      rating,
      user: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      const response = await axios.post(
        "https://edu-connect-server-ebon.vercel.app/feedback",
        feedbackData
      );
      Swal.fire({
        title: "Feedback Sent!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      console.log("Feedback sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Feedback Modal"
      className="flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Give Your Feedback
          </h2>

          <label
            htmlFor="feedback"
            className="block mb-2 font-medium text-gray-600"
          >
            Your Valuable Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Say whatever you want..."
            className="textarea textarea-bordered w-full min-h-[100px] mb-4"
            required
          />

          <label className="block mb-2 font-medium text-gray-600">
            Your Rating:
          </label>
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                onClick={() => setRating(index + 1)}
                className={`text-2xl cursor-pointer ${
                  rating >= index + 1 ? "text-orange-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="btn btn-accent flex items-center gap-2"
            >
              <FaPaperPlane /> Submit
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="btn btn-error flex items-center gap-2"
            >
              <FaTimes /> Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalFeedBack;
