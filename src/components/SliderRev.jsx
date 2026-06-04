import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SliderRev = () => {
  const {
    data: feedbacks = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axios.get(
        "https://edu-connect-server-ebon.vercel.app/feedback"
      );
      return res.data;
    },
  });
  console.log(feedbacks);

  return (
    <div className="mt-20 max-w-screen-2xl mx-auto">
      <Carousel
        arrows={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        infinite
        responsive={responsive}
      >
        {isLoading ? (
          <p>Loading feedback...</p>
        ) : error ? (
          <p>Error loading feedback: {error.message}</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback available at the moment.</p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div className="flex gap-2" key={index}>
              <div className="bg-[#140c1c]  p-6 rounded shadow-lg mb-4">
                <div className="flex justify-center items-center mb-2">
                  <img
                    src={feedback.user.image}
                    alt={`${feedback.user.name}'s profile`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-50">
                      {feedback.user.name}
                    </h3>
                    <p className="text-gray-500">{feedback.user.email}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-center">
                  {feedback.feedback.slice(0, 150)}
                </p>
                <div className="rating mt-2 flex justify-center items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`mask mask-star-2 bg-orange-400 ${
                        i < feedback.rating
                          ? "text-orange-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default SliderRev;
