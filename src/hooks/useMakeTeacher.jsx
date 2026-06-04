import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMakeTeacher = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isTeacher,
    isPending: isTeacherPending,
    error,
  } = useQuery({
    queryKey: [user?.email, "isTeacher"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-req/teacher/${user?.email}`);
      return res.data?.teacher;
    },
  });

  return [isTeacher, isTeacherPending];
};

export default useMakeTeacher;

////

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useMakeTeacher = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: isTeacher, isPending: isTeacherPending } = useQuery({
//     queryKey: [user?.email, "isTeacher"],
//     enabled: !!user?.email, // ✅ Ensures query runs only when user.email is available
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/teacher-req/teacher/${user.email}`);
//       return res.data?.teacher;
//     },
//   });

//   return [isTeacher, isTeacherPending];
// };

// export default useMakeTeacher;
