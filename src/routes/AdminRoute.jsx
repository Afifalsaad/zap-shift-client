import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ForbiddenPage from "../components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen text-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (role !== "admin") {
    return <ForbiddenPage></ForbiddenPage>;
  }

  return children;
};

export default AdminRoute;
