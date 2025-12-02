import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

  const barChartData = (data) => {
    console.log(data);
    return data.map((item) => {
      return { name: item.status, value: item.count };
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-secondary font-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="max-w-11/12 mx-auto mt-10">
        <div className="stats shadow ">
          {deliveryStat.map((stat) => (
            <div key={stat._id} className="stat place-items-center">
              <div className="stat-title text-2xl font-bold text-secondary">
                {stat._id}
              </div>
              <div className="stat-value">{stat.count}</div>
            </div>
          ))}
        </div>

        {/* ReChart */}
        <div className="mt-20">
          <BarChart
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
            data={barChartData(deliveryStat)}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
