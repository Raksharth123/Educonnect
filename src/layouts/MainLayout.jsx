import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-primary text-textLight dark:bg-gray-800 transition-colors duration-300">
      <Navbar></Navbar>

      <div className="pt-24  min-h-[calc(100vh-68px)]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

// import { Outlet } from "react-router-dom";
// import Navbar from "../components/shared/Navbar/Navbar";
// import Footer from "../components/shared/Footer/Footer";

// const MainLayout = () => {
//   return (
//     <div className="bg-primary text-textLight dark:bg-gray-800 transition-colors duration-300 flex flex-col min-h-screen">
//       {/* Navbar */}
//       <Navbar />

//       {/* Page Content */}
//       <main className="flex-grow pt-24 px-4 sm:px-6 md:px-8">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;
