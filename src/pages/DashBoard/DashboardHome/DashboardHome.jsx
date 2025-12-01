import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="min-h-screen text-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
