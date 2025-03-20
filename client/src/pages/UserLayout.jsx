import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Outlet />
    </div>
  );
};

export default UserLayout;
