import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStat = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl text-secondary font-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="max-w-11/12 mx-auto mt-10">
        <div className="stats shadow">
          {deliveryStat.map((stat) => (
            <div className="stat place-items-center">
              <div className="stat-title">{stat._id}</div>
              <div className="stat-value">{stat.count}</div>
              <div className="stat-desc">From January 1st to February 1st</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
