import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Settings() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="mt-3">User settings will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;