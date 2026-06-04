import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useMakeTeacher from "../../../hooks/useMakeTeacher";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../providers/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoLogoReact } from "react-icons/io5";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isTeacher] = useMakeTeacher();

  const userName = user?.displayName || "User";

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const dashboardLinks = isAdmin
    ? [
        { path: "/dashboard/profile", label: "Admin Profile" },
        { path: "/dashboard/teacherRequest", label: "Teachers Request" },
        { path: "/dashboard/users", label: "Users" },
        { path: "/dashboard/adminAllclasses", label: "All Classes" },
      ]
    : isTeacher
    ? [
        { path: "/dashboard/addClasses", label: "Add Class" },
        { path: "/dashboard/myClass", label: "My Class" },
        { path: "/dashboard/profile", label: "Teacher Profile" },
      ]
    : [
        { path: "/dashboard/my-enroll-class", label: "My Enroll Class" },
        { path: "/dashboard/profile", label: "Student Profile" },
      ];

  return (
    <div className="navbar fixed z-50 bg-sectionColor">
      {/* Logo and Site Name */}
      <div className="flex-1 lg:ml-12 flex items-center space-x-2">
        <IoLogoReact className="text-4xl text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-spin-slow" />
        <Link to="/" className="btn btn-ghost text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 font-bold">
          EduConnect
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none lg:mr-12">
        <div className="hidden sm:flex space-x-4">
          <NavLink to="/" className="btn btn-ghost">
            Home
          </NavLink>
          <NavLink to="/all-classes" className="btn btn-ghost">
            All Classes
          </NavLink>
          <NavLink to="/TeachOnWebsite" className="btn btn-ghost">
            Teach on EduConnect
          </NavLink>

          {/* Dashboard Dropdown */}
          {user && (
            <div className="dropdown dropdown-hover">
              <button className="btn btn-ghost dark:text-gray-200">
                Dashboard
              </button>
              <ul className="dropdown-content bg-[#0c0a12] dark:bg-[#0c0a12] shadow-lg rounded-box p-2 w-52 border border-purple-950">
                {dashboardLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition rounded ${
                          isActive
                            ? "bg-purple-950/40 text-purple-300"
                            : "hover:bg-purple-950/20 text-slate-300 hover:text-white"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Theme Toggle */}
          <div className="rounded-full flex justify-start items-center mr-2 text-gray-900 dark:text-white transition">
            <button onClick={toggleTheme} className="mr-2 text-purple-400">
              {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
            </button>
          </div>
        </div>

        {/* User Avatar + Dropdown */}
        <div className="relative">
          {user ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border border-purple-500"
              />

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-[#0c0a12] shadow-lg rounded-lg p-4 w-48 border border-purple-950 z-50">
                  <p className="text-base font-semibold text-white text-center mb-2">
                    {userName}
                  </p>

                  <NavLink
                    to="/dashboard"
                    className="block text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 px-3 py-2 rounded transition duration-200 text-center"
                  >
                    Dashboard
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full text-white text-sm bg-gradient-to-r from-rose-600 to-rose-700 hover:opacity-90 px-3 py-2 rounded transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:opacity-95 rounded-xl px-5 py-2.5 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 text-center border-none"
            >
              Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <ul className="menu menu-compact bg-base-100 absolute right-0 top-full mt-2 w-48 rounded-box shadow-md z-50">
            <li>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-classes"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TeachOnWebsite"
                onClick={() => setMobileMenuOpen(false)}
              >
                Teach on EduConnect
              </NavLink>
            </li>
            {user && (
              <li>
                <details>
                  <summary>Dashboard</summary>
                  <ul className="p-2 bg-white rounded shadow-md">
                    {dashboardLinks.map((link) => (
                      <li key={link.path}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm transition ${
                              isActive ? "bg-gray-300" : "hover:bg-gray-200"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
