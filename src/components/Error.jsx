import { Link } from "react-router-dom";
import Error404 from "./Error404";

const Error = () => {
  return (
    <div className="flex flex-col pb-40 gap-20 justify-center items-center">
      <title>Error</title>

      <Error404></Error404>
      <Link className="btn btn-accent" to={"/"}>
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
