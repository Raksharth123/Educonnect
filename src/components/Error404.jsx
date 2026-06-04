import { useLottie } from "lottie-react";
import ErrorAnimation from "../assets/404.json";

const Error404 = () => {
  const options = {
    animationData: ErrorAnimation,
    loop: true,
    autoplay: true,
  };

  // Apply styles to the container
  const style = {
    width: "500px",
    height: "300px",
  };

  const { View } = useLottie(options);

  return <div style={style}>{View}</div>;
};

export default Error404;
