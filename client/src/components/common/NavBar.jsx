import { Link, useNavigate } from "react-router";

const NavBar = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Confirm Logout\nThis will delete your saved draft."
    );

    if (confirmLogout) {
      localStorage.clear();
      nav("/login");
    }
  };

  return (
    <nav className="bg-[--midnight-blue] text-[--light-gray] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">Mood Journal - Motivational Journal App</Link>
        </h1>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-[--warm-yellow] text-[--midnight-blue] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-opacity-80 transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
