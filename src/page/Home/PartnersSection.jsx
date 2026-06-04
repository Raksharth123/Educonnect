/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const collaborators = [
  {
    id: 1,
    logo: "https://i.ibb.co/N2yhXc0/Amazon-Logo-1.webp",
    name: "Amazon",
    description:
      "Empowering students with the resources they need to innovate and grow.",
  },
  {
    id: 2,
    logo: "https://i.ibb.co/y50tm7z/samsung.webp",
    name: "Samsung",
    description:
      "Enhancing education through cutting-edge technology and innovation.",
  },
  {
    id: 3,
    logo: "https://i.ibb.co/VmGkhWL/spotifypng.webp",
    name: "Spotify",
    description:
      "Creating harmony in learning by integrating music into education.",
  },
  {
    id: 4,
    logo: "https://i.ibb.co/9YcQL1t/uni.png",
    name: "Stamford University",
    description:
      "Shaping the future of education with collaborative learning experiences.",
  },
];

const PartnerCard = ({ partner }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      ref={ref}
      initial={{ rotateY: 180, opacity: 0 }}
      animate={inView ? { rotateY: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="partner-card bg-white shadow-md p-5 rounded-lg text-center"
    >
      <img
        src={partner.logo}
        alt={`${partner.name} Logo`}
        className="w-24 h-24 mx-auto mb-4 object-contain"
      />
      <h3 className="text-xl text-gray-700 font-semibold mb-2">
        {partner.name}
      </h3>
      <p className="text-gray-600 text-sm">{partner.description}</p>
    </motion.div>
  );
};

const PartnersSection = () => {
  return (
    <section
      id="partners"
      className="partners-section py-10 px-5 bg-sectionColor mt-12"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Partners & Collaborators
      </h2>
      <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {collaborators.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
