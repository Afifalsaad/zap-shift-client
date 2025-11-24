import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen text-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h2>Please Pay for : {parcel.ParcelName}</h2>
      <button className="btn btn-primary text-black">Pay Now</button>
    </div>
  );
};

export default Payment;
