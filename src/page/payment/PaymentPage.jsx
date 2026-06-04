// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./CheckOutForm";

// // TODO: publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const PaymentPage = () => {
//   return (
//     <div>
//       <div className="my-10">
//         <h1 className="text-3xl text-green-300 flex justify-center font-bold">
//           Payments
//         </h1>
//       </div>
//       <div>
//         <Elements stripe={stripePromise}>
//           <CheckOutForm></CheckOutForm>
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import CheckOutForm from "./CheckOutForm";

// TODO: publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Secure Payment
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Complete your transaction safely and securely
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded"></div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
