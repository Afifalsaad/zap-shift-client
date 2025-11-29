import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const handleStatusUpdate = (parcel, status) => {
    const statusInfo = {
      riderId: parcel.riderId,
      deliveryStatus: status,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel Status is updated with ${status
      .split("_")
      .join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Accepted!",
            text: message,
            icon: "success",
          });
        }
      });
  };

  const handleReject = (parcel) => {
    const updatedStatus = {
      riderId: parcel.riderId,
      deliveryStatus: "pending-pickup",
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/reject`, updatedStatus)
      .then((res) => {
        console.log(res.data);

        if (res.data.matchedCount) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            icon: "warning",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-secondary ">
        Assigned Deliveries: {parcels.length}
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
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No assigned deliveries yet
                </td>
              </tr>
            )}

            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.senderAddress}</td>
                <td>
                  {parcel.deliveryStatus === "pending-pickup" ? (
                    <p className="text-red-500">Rejected</p>
                  ) : parcel.deliveryStatus === "rider_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel, "rider-arriving")
                        }
                        className="btn btn-primary text-black">
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(parcel)}
                        className="btn btn-warning ms-2 text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                {parcel.deliveryStatus !== "pending-pickup" && (
                  <>
                    <td>
                      <button
                        onClick={() => handleStatusUpdate(parcel, "picked-up")}
                        className="btn btn-primary text-black mx-2">
                        Mark as Picked Up
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(parcel, "delivered")}
                        className="btn btn-primary text-black">
                        Mark as Delivered
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
