// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import { imageUpload } from "../../components/api/utils";
// import axios from "axios";

// const Register = () => {
//   const { createUser, updateUserProfile } = useAuth();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;

//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const image = e.target.image.files[0];

//     const photoURL = await imageUpload(image);

//     // Validate password
//     const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
//     if (!regex.test(password)) {
//       Swal.fire({
//         title: "Invalid Password",
//         text: "Please use at least one uppercase, one lowercase, and one digit.",
//         icon: "warning",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     try {
//       // User Registration
//       createUser(email, password).then((res) => {
//         console.log(res);
//         updateUserProfile(name, photoURL).then((result) => {
//           axios.post(`${import.meta.env.VITE_API_URL}/users/${email}}`, {
//             name,
//             image: photoURL,
//             email,
//           });
//           console.log(result);
//         });
//       });

//       // Navigate to the home page
//       navigate("/");

//       // Show success alert
//       Swal.fire({
//         title: "Signup Successful",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (err) {
//       console.error(err);
//       // Show error alert
//       Swal.fire({
//         title: "Error",
//         text: err?.message || "Something went wrong!",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//         <h2 className="text-gray-400 text-2xl font-medium text-center py-4">
//           Register Your account
//         </h2>
//         <form onSubmit={handleRegister} className="card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter Your Name"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           {/* <div className="form-control">
//             <label className="label">
//               <span className="label-text">Photo URL</span>
//             </label>
//             <input
//               type="text"
//               name="url"
//               placeholder="Enter Your Photo URL"
//               className="input input-bordered"
//               required
//             />
//           </div> */}
//           {/* <div className="form-control">
//             <label className="label">
//               <span className="label-text">Number</span>
//             </label>
//             <input
//               type="number"
//               name="number"
//               placeholder="Enter Your Number"
//               className="input input-bordered"
//               required
//             />
//           </div> */}
//           <div>
//             <label htmlFor="image" className="block mb-2 text-sm">
//               Select Image:
//             </label>
//             <input
//               required
//               type="file"
//               id="image"
//               name="image"
//               accept="image/*"
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control mt-6">
//             <button className="btn btn-primary">Register</button>
//           </div>
//         </form>
//         <p className="text-center text-gray-400 font-semibold py-1">
//           Already have an account?{" "}
//           <Link className="text-red-500" to="/login">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../components/api/utils";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];

    const photoURL = await imageUpload(image);

    // Validate password
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    if (!regex.test(password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Please use at least one uppercase, one lowercase, and one digit.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // User Registration
      createUser(email, password).then((res) => {
        console.log(res);
        updateUserProfile(name, photoURL).then((result) => {
          axios.post(`${import.meta.env.VITE_API_URL}/users/${email}`, {
            name,
            image: photoURL,
            email,
          });
          console.log(result);
        });
      });

      // Navigate to the home page
      navigate("/");

      // Show success alert
      Swal.fire({
        title: "Signup Successful",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      // Show error alert
      Swal.fire({
        title: "Error",
        text: err?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="min-h-screen -mt-8  flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
          >
            Register
          </motion.button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue-600 font-medium"
            to="/login"
          >
            Login
          </Link>
          �i{" "}
        </p>
        <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded"></div>
      </motion.div>
    </div>
  );
};

export default Register;
