import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [btnText, setBtnText] = useState("Login");

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isDisabled = btnText === "Logging in...";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnText("Logging in...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        toast.success("User logged in successfully");
        localStorage.setItem("token", response.data.token);
        nav("/user");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.log("Error", error);
    } finally {
      setBtnText("Login");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      nav("/user")
    }
    
    
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[--white-smoke] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[--light-gray] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[--midnight-blue]">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-[--soft-blue] font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[--soft-blue] rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[--midnight-blue] transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[--soft-blue] font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-[--soft-blue] rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[--midnight-blue] transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[--midnight-blue] text-[--light-gray] p-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          disabled={isDisabled}
        >
          {btnText}
        </button>

        <Link
          to="/"
          className="block text-center mt-4 text-[--midnight-blue] hover:underline"
        >
          Don't have an account? <span className="font-semibold">Register</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
