import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;

////

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin, isPending: isAdminLoading } = useQuery({
//     queryKey: [user?.email, "isAdmin"],
//     enabled: !!user?.email, // ✅ Ensures query runs only when user.email is available
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user.email}`);
//       return res.data?.admin;
//     },
//   });

//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;
