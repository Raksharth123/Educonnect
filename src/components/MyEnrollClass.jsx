import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const MyEnrollClass = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  // const { user } = useAuth(); // Get logged-in user info
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    {
      axiosSecure
        .get(`/my-enrolled-class/${user?.email}`)
        .then((res) => {
          setEnrolledClasses(res.data); // Update state with enrolled classes
        })
        .catch((err) => {
          console.error("Error fetching enrolled classes:", err);
        });
    }
  }, [axiosSecure]);
  console.log(enrolledClasses);

  const enrollHandler = (enrolledClass) => {
    navigate(`/dashboard/my-enroll-class/${enrolledClass._id}`, {
      state: { enrolledClass }, // Pass data as state
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrolledClasses.length > 0 ? (
        enrolledClasses.map((enrolledClass) => (
          <div
            key={enrolledClass._id}
            className="card shadow-lg p-4 rounded-xl"
          >
            <img
              src={enrolledClass.myClass.image}
              alt={enrolledClass.myClass.title}
              className="rounded-lg w-full h-40 object-cover"
            />
            <h2 className="text-xl font-bold mt-4">
              {enrolledClass.myClass.title}
            </h2>
            <p className="text-sm text-gray-600">
              Posted by:{" "}
              <span className="font-medium">
                {enrolledClass.myClass.publisher.name}
              </span>
            </p>
            <button
              onClick={() => enrollHandler(enrolledClass)}
              className="btn mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No enrolled classes found.
        </p>
      )}
    </div>
  );
};

export default MyEnrollClass;
