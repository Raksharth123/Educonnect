import { motion } from "framer-motion";

const Faq = () => {
  const faqs = [
    {
      question: "How can I enroll in a course?",
      answer:
        "To enroll, go to the course page and click the 'Enroll Now' button. Follow the payment and registration steps.",
    },
    {
      question: "Can I access courses after completion?",
      answer:
        "Yes, once you complete a course, you can access the materials anytime from your dashboard.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Your progress is tracked automatically. You can check it in your profile under the 'My Courses' section.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 7-day refund policy for courses that have not been completed beyond 10%.",
    },
    {
      question: "Can I interact with instructors?",
      answer:
        "Yes, you can ask questions in the course discussion section or join live Q&A sessions.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="collapse collapse-plus border border-gray-300 bg-gray-100 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={containerVariants}
          >
            <input type="checkbox" />
            <div className="collapse-title text-gray-700 text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
