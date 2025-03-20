import { Link } from "react-router";

const NotFound = ({ text = "Oops! Page not found." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-7xl font-extrabold text-[--gray-dark] drop-shadow-lg">
        404
      </h1>
      <p className="text-lg text-[--gray-light] mt-2">
        {text || "Page Not Found"}
      </p>

      <Link
        to="/user"
        className="mt-6 px-6 py-3 text-white bg-[--primary] rounded-lg shadow-md hover:bg-[--primary-hover] transition duration-300 transform hover:scale-105"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
