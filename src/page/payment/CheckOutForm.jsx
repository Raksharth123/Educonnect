// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const { user } = useAuth();
//   const [clientSecret, setClientSecret] = useState("");
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const location = useLocation();
//   const { classDetails } = location.state || {};

//   const price = parseInt(classDetails.price);
//   // console.log(classDetails, "class details");
//   // console.log(price);

//   useEffect(() => {
//     if (classDetails && price > 0) {
//       axiosSecure
//         .post(`/create-payment-intent/${classDetails._id}`, {
//           price: price * 100, // Convert price to cents
//         })
//         .then((res) => {
//           setClientSecret(res.data.clientSecret); // Set client secret for the payment intent
//         })
//         .catch((error) => {
//           console.error("Error creating payment intent:", error);
//         });
//     }
//   }, [axiosSecure, price, classDetails]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log(error.message, "payment error");
//       setError(error.message);
//     } else {
//       console.log("payment method", paymentMethod);
//       setError("");
//     }

//     // confirm payment
//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email || "Anonymous",
//             name: user?.displayName || "Anonymous,",
//           },
//         },
//       });
//     if (confirmError) {
//       // console.log("confirmError");
//     } else {
//       // console.log("payment intent", paymentIntent);
//       if (paymentIntent.status === "succeeded") {
//         // console.log(paymentIntent.id, "Transaction Id");
//         setTransactionId(paymentIntent.id);
//         Swal.fire({
//           title: "Success!",
//           text: "Payment Successful",
//           icon: "success",
//         });
//         navigate("/dashboard/my-enroll-class");

//         // now save the payment in the data base
//         const payment = {
//           email: user?.email,
//           price: price,
//           transactionId: paymentIntent.id,
//           date: new Date(),
//           myClass: classDetails,
//         };
//         const res = await axiosSecure.post("/payments", payment);
//       }
//     }
//   };

//   return (
//     <div className="w-2/3 mx-auto">
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button
//           className="btn btn-info my-8"
//           type="submit"
//           disabled={!stripe || !clientSecret}
//         >
//           Click To Pay
//         </button>
//         <p className="text-red-600 text-xl font-bold">{error}</p>
//         {transactionId && (
//           <p className="text-green-600 text-xl font-bold">
//             Your Transaction Id: {transactionId}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CheckOutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const { classDetails } = location.state || {};

  const price = parseInt(classDetails.price);

  useEffect(() => {
    if (classDetails && price > 0) {
      axiosSecure
        .post(`/create-payment-intent/${classDetails._id}`, {
          price: price * 100, // Convert price to cents
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret); // Set client secret for the payment intent
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [axiosSecure, price, classDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message, "payment error");
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log("confirmError");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        Swal.fire({
          title: "Success!",
          text: "Payment Successful",
          icon: "success",
        });
        navigate("/dashboard/my-enroll-class");

        // now save the payment in the database
        const payment = {
          email: user?.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          myClass: classDetails,
        };
        await axiosSecure.post("/payments", payment);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg sm:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Card Details
          </label>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1f2937",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                    padding: "10px",
                  },
                  invalid: {
                    color: "#dc2626",
                  },
                },
              }}
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay Now
        </motion.button>
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}
        {transactionId && (
          <p className="text-green-600 text-sm font-medium text-center">
            Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default CheckOutForm;
