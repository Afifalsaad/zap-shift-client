import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&ridersDistrict=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  const handleAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    console.log(selectedParcel);
    modalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
      riderEmail: rider.email,
      riderName: rider.name,
      riderPhoneNumber: rider.phoneNumber,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          modalRef.current.close();
          Swal.fire({
            title: "Confirmed!",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Assign Riders: {parcels.length}</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Pickup District</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.createdAt}</td>
                <td>
                  <button
                    onClick={() => handleAssignRiderModal(parcel)}
                    className="btn btn-primary text-black">
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Riders Available: {riders.length}
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary text-black">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
