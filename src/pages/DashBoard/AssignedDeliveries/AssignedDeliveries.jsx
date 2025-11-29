import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {  data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned`);
      console.log(res.data)
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl font-bold text-secondary ">
        Assigned Deliveries
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>District</th>
              <th>Address</th>
              <th>Confirm</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.senderAddress}</td>
                <td>
                  <button className="btn btn-primary text-black">Accept</button>
                  <button className="btn btn-warning ms-2 text-black">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
