import { motion } from "framer-motion";

const CoursesSection = () => {
  return (
    <div className="py-10 ">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Our Courses About
      </h2>

      <div className="grid grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-3 gap-14 md:px-12">
        {/* Web Development Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <figure>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Web Development"
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="p-5">
            <h3 className="text-xl text-gray-600 font-semibold mb-2">
              Web Development
            </h3>
            <p className="text-gray-600 mb-4">
              Learn the skills to build modern, responsive websites and web
              applications.
            </p>
          </div>
        </motion.div>

        {/* Artificial Intelligence Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <figure>
            <img
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Artificial Intelligence"
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="p-5">
            <h3 className="text-xl text-gray-600 font-semibold mb-2">
              Artificial Intelligence
            </h3>
            <p className="text-gray-600 mb-4">
              Dive into AI and machine learning to create intelligent systems.
            </p>
          </div>
        </motion.div>

        {/* Graphic Design Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <figure>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Graphic Design"
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2 text-gray-600">
              Graphic Design
            </h3>
            <p className="text-gray-600 mb-4">
              Master the art of visual communication through design.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesSection;
