import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const InspireTeacher = () => {
  return (
    <div
      id="becomeTeacher"
      className="flex items-center justify-center bg-sectionColor mt-12 py-10 "
    >
      <div className="grid md:grid-cols-2 items-center gap-4 px-4 max-w-7xl mx-auto">
        {/* Left Section: Image */}
        <motion.div
          className="relative w-full max-w-[300px] h-[300px] mx-auto md:mx-0 p-1.5 bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.35)]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co/xS3Ty9s/Portrait-of-indian-teacher-smiling-while-teaching-the-kids-in-the-school-Premium-AI-generated-image.jpg"
            alt="Instructor"
            className="rounded-xl shadow-lg w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Section: Content */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 font-extrabold">Instructor</span>
          </h2>
          <p className="text-lg mb-6">
            Share your knowledge with learners worldwide. We provide the tools
            and support you need to inspire and teach what you love.
          </p>
          <Link to="/TeachOnWebsite">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:opacity-95 border-none"
            >
              Start Teaching Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default InspireTeacher;
