// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import { useState } from "react";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });

//   const navigate = useNavigate();
//   const { LogIn, signInWithGoogle, loading } = useAuth();
//   if (loading) {
//     return <span className="loading loading-infinity loading-lg"></span>;
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = credentials;
//     // const email = e.target.email.value;
//     // const password = e.target.password.value;

//     // Log in
//     try {
//       await LogIn(email, password);
//       navigate("/");
//     } catch (error) {
//       console.error("ERROR", error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithGoogle();
//       navigate("/");
//     } catch (error) {
//       console.log("error", error.message);
//     }
//   };

//   const fillCredentials = (role) => {
//     if (role === "admin") {
//       setCredentials({ email: "instructor@gmail.com", password: "1234Rr" });
//     } else if (role === "teacher") {
//       setCredentials({ email: "teacher@gmail.com", password: "1234Rr" });
//     } else {
//       setCredentials({ email: "ping@gmail.com", password: "1234Rr" });
//     }
//   };

//   return (
//     <div className="min-h-screen flex gap-8 justify-center items-center">
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//         <h2 className="text-gray-400 text-2xl font-medium text-center py-4">
//           Login to Your Account
//         </h2>
//         <form onSubmit={handleLogin} className="card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               value={credentials.email}
//               onChange={(e) =>
//                 setCredentials({ ...credentials, email: e.target.value })
//               }
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="input text-gray-500 input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               value={credentials.password}
//               onChange={(e) =>
//                 setCredentials({ ...credentials, password: e.target.value })
//               }
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="input text-gray-500 input-bordered"
//               required
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover">
//                 Forgot password?
//               </a>
//             </label>
//           </div>
//           <div className="form-control mt-6">
//             <button className="btn btn-primary">Login</button>
//           </div>
//         </form>
//         <div className="flex justify-center py-2">
//           <button onClick={handleGoogleLogin} className="btn btn-secondary">
//             Sign in with Google
//           </button>
//         </div>
//         <p className="text-center text-gray-500 font-semibold py-1">
//           Don't have an account?{" "}
//           <Link className="text-red-500" to="/register">
//             Register
//           </Link>
//         </p>
//       </div>
//       <div className="flex justify-between">
//         <div className="flex flex-col gap-4">
//           <h2 className="text-gray-400 font-bold text-3xl">
//             Demo Credentials For Check
//           </h2>
//           <div className="flex gap-4">
//             <button
//               className="btn btn-info"
//               onClick={() => fillCredentials("user")}
//             >
//               User Credentials
//             </button>
//             <button
//               className="btn btn-info"
//               onClick={() => fillCredentials("admin")}
//             >
//               Admin Credentials
//             </button>
//             <button
//               className="btn btn-info"
//               onClick={() => fillCredentials("teacher")}
//             >
//               Teacher Credentials
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { LogIn, signInWithGoogle, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg text-blue-500"></span>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      await LogIn(email, password);
      navigate("/");
    } catch (error) {
      console.error("ERROR", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fillCredentials = (role) => {
    if (role === "admin") {
      setCredentials({ email: "instructor@gmail.com", password: "1234Rr" });
    } else if (role === "teacher") {
      setCredentials({ email: "teacher@gmail.com", password: "1234Rr" });
    } else {
      setCredentials({ email: "ping@gmail.com", password: "1234Rr" });
    }
  };

  return (
    <div
      className="min-h-screen -mt-8 flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
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
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
              />
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
            >
              Login
            </motion.button>
          </form>
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-md"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </motion.button>
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-600 font-medium"
              to="/register"
            >
              Register
            </Link>
          </p>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col justify-center text-white p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Demo Credentials
          </h2>
          <p className="text-sm text-gray-200 mb-4">
            Use these credentials to explore the platform:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fillCredentials("user")}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
            >
              User Credentials
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fillCredentials("admin")}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
            >
              Admin Credentials
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fillCredentials("teacher")}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
            >
              Teacher Credentials
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
