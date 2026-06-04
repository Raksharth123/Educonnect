import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiGrid, 
  FiUser, 
  FiUserCheck, 
  FiUsers, 
  FiBookOpen, 
  FiPlusCircle, 
  FiList, 
  FiLogOut, 
  FiMenu, 
  FiX 
} from "react-icons/fi";
import { IoLogoReact } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useMakeTeacher from "../../hooks/useMakeTeacher";
import useAuth from "../../hooks/useAuth";
import Stats from "../../components/Home/Stats";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useMakeTeacher();
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isRootPath = location.pathname === "/dashboard";
  const userRole = isAdmin ? "Admin" : isTeacher ? "Teacher" : "Student";

  // Role Badge Styling for Black and Purple Theme
  const roleBadgeClass = isAdmin
    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
    : isTeacher
    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30"
    : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";

  // Navigation Links Definition
  const adminLinks = [
    ["/", <FiHome />, "Home"],
    ["/dashboard", <FiGrid />, "Dashboard overview"],
    ["/dashboard/profile", <FiUser />, "Admin Profile"],
    ["teacherRequest", <FiUserCheck />, "Teachers Request"],
    ["users", <FiUsers />, "Users"],
    ["/dashboard/adminAllclasses", <FiBookOpen />, "All Classes"],
  ];

  const teacherLinks = [
    ["/", <FiHome />, "Home"],
    ["/dashboard", <FiGrid />, "Dashboard overview"],
    ["/dashboard/addClasses", <FiPlusCircle />, "Add Class"],
    ["/dashboard/myClass", <FiList />, "My Class"],
    ["/dashboard/profile", <FiUser />, "Teachers Profile"],
  ];

  const studentLinks = [
    ["/", <FiHome />, "Home"],
    ["/dashboard", <FiGrid />, "Dashboard overview"],
    ["/dashboard/my-enroll-class", <FiBookOpen />, "My Enroll Class"],
    ["/dashboard/profile", <FiUser />, "Student Profile"],
  ];

  const userLinks = isAdmin
    ? adminLinks
    : isTeacher
    ? teacherLinks
    : studentLinks;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6", // Purple confirmation button
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, Sign Out!",
      background: "#0c0a0f", // Dark theme background
      color: "#f1e9ff", // Light purple text
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logOut();
          Swal.fire({
            title: "Logged Out",
            text: "Successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#0c0a0f",
            color: "#f1e9ff",
          });
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to logout. Please try again.",
            icon: "error",
            background: "#0c0a0f",
            color: "#f1e9ff",
          });
        }
      }
    });
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between overflow-y-auto bg-[#07050c]">
      <div>
        {/* Profile Card */}
        <div className="p-5 border-b border-purple-950/50 bg-[#0c0a0f]/40">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#07050c] rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <span
                className={`inline-block px-2 py-0.5 mt-1 text-[10px] font-semibold tracking-wider uppercase rounded-full ${roleBadgeClass}`}
              >
                {userRole}
              </span>
            </div>
          </div>
        </div>

        {/* NavLinks */}
        <nav className="px-4 py-6">
          <ul className="space-y-1.5">
            {userLinks.map(([to, icon, label]) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        : "text-slate-400 hover:text-white hover:bg-purple-950/20"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator bar with purple neon glow */}
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-6 bg-purple-400 shadow-[0_0_8px_#a855f7] rounded-r"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span
                        className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? "text-purple-200"
                            : "text-slate-400 group-hover:text-purple-300"
                        }`}
                      >
                        {icon}
                      </span>
                      <span className="text-sm font-medium tracking-wide">
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-purple-950/50 bg-[#0c0a0f]/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-400 hover:text-white bg-rose-950/20 hover:bg-rose-600 border border-rose-950/30 hover:border-transparent rounded-xl transition-all duration-200 shadow-sm"
        >
          <FiLogOut className="text-base" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout min-h-screen bg-[#03000a] text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      {/* Mobile Sticky Header */}
      <header className="md:hidden flex items-center justify-between bg-[#07050c] text-white px-4 py-3 sticky top-0 z-40 shadow-md border-b border-purple-950/40">
        <div className="flex items-center space-x-2">
          <IoLogoReact className="text-3xl text-purple-400 animate-spin-slow" />
          <span className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EduConnect</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-2xl hover:bg-purple-950/20 rounded-lg transition-colors focus:outline-none"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#07050c] text-white fixed top-0 bottom-0 left-0 z-30 shadow-[5px_0_25px_rgba(0,0,0,0.5)] border-r border-purple-950/40">
        <div className="p-5 border-b border-purple-950/50 flex items-center space-x-3 bg-[#0c0a0f]/20">
          <IoLogoReact className="text-3xl text-purple-400 animate-spin-slow" />
          <span className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EduConnect</span>
        </div>
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#07050c] text-white z-50 flex flex-col shadow-2xl md:hidden border-r border-purple-950/40"
            >
              <div className="p-4 flex items-center justify-between border-b border-purple-950/40 bg-[#0c0a0f]/20">
                <div className="flex items-center space-x-2">
                  <IoLogoReact className="text-3xl text-purple-400" />
                  <span className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EduConnect</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-2xl hover:bg-purple-950/20 rounded-lg transition-colors focus:outline-none"
                >
                  <FiX />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <main className="dashboard-content flex-grow bg-[#03000a] p-4 md:p-8 overflow-y-auto transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {isRootPath && <Stats />}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
