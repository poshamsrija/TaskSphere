import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow p-4 mb-4">

      <h1 className="text-xl font-bold">
        TaskSphere
      </h1>

      <button
        onClick={handleLogout}
        className="text-red-500 hover:text-red-700"
      >
        Logout
      </button>

    </div>
  );
}

export default Header;