import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../page/Home/Home";
import Register from "../page/Register/Register";
import Login from "../page/Login/Login";
import MyEnrollclass from "../components/MyEnrollClass";
import AddClasses from "../page/AddClasses/AddClasses";
import MyClass from "../page/dashboard/sidebar/menuItem/teacherItem/MyClass";
import MyProfile from "../page/myProfile/MyProfile";
import AllClasses from "../page/Allclass/AllClasses";
import ClassDetails from "../page/Allclass/ClassDetails";
import TeachOnWebsite from "../page/TeachOnWebSite/TeachOnWebsite";
import TeachersRequest from "../page/dashboard/sidebar/menuItem/AdminMenu/AdminItem/TeachersRequest";
import AllUsers from "../page/dashboard/sidebar/menuItem/AdminMenu/AdminItem/AllUsers";
import AdminRoute from "./AdminRoute";
import AllReqClass from "../page/dashboard/sidebar/menuItem/AdminMenu/AdminItem/AllReqClass";
import PaymentPage from "../page/payment/PaymentPage";
import MyClassDetails from "../page/dashboard/sidebar/menuItem/teacherItem/MyClassDetails";
import MyenrollDetails from "../components/MyEnrollDetails";
import PrivateRoute from "./PrivateRoute";
import Error from "../components/Error";
import Dashboard from "../page/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/class/:id",
        element: <ClassDetails></ClassDetails>,
      },
      {
        path: "/TeachOnWebsite",
        element: (
          <PrivateRoute>
            <TeachOnWebsite></TeachOnWebsite>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {/* <DashboardLayout></DashboardLayout> */}
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "teacherRequest",
        element: <TeachersRequest></TeachersRequest>,
      },
      {
        path: "my-enroll-class",
        element: <MyEnrollclass></MyEnrollclass>,
      },
      {
        path: "my-enroll-class/:id",
        element: <MyenrollDetails></MyenrollDetails>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "adminAllclasses",
        element: <AllReqClass></AllReqClass>,
      },
      // teacher route
      {
        path: "addClasses",
        element: <AddClasses></AddClasses>,
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>,
      },
      {
        path: "my-class/:id",
        element: <MyClassDetails></MyClassDetails>,
      },
      {
        path: "payment",
        element: <PaymentPage></PaymentPage>,
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
