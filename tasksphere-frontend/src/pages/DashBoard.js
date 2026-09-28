import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KanbanBoard from "../components/KanbanBoard";

function Dashboard() {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-6">

          <KanbanBoard />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;