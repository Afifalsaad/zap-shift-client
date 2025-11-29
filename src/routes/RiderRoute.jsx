import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ForbiddenPage from "../components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen text-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (role !== "rider") {
    return <ForbiddenPage></ForbiddenPage>;
  }

  return children;
};

export default RiderRoute;
