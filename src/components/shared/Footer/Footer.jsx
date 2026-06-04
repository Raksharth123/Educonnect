import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-sectionColor text-white py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-items-between gap-10 text-center md:text-left">
        {/* Brand Info */}
        <div className="flex-1">
          <h6 className="footer-title flex items-center justify-center md:justify-start gap-2 text-xl font-bold mb-2">
            <FaReact className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> EduConnect
          </h6>
          <p className="text-sm">
            Empowering Learning, Connecting Educators & Students.
          </p>
        </div>

        {/* Resources Links */}
        <div className="flex-1">
          <h6 className="footer-title text-lg font-semibold mb-3">Resources</h6>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <a href="#course" className="link link-hover">
              Courses
            </a>
            <a href="#becomeTeacher" className="link link-hover">
              Become Tutor
            </a>
            <a href="#partners" className="link link-hover">
              Partners
            </a>
            <a href="#stats" className="link link-hover">
              Stats
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="flex-1">
          <h6 className="footer-title text-lg font-semibold mb-3">Follow Us</h6>
          <div className="flex justify-center md:justify-start gap-6 text-xl">
            <a
              href="https://www.facebook.com/imroknujjamanrony"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/RoknujjamanRon2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/md-roknujjaman-rony-906780210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
