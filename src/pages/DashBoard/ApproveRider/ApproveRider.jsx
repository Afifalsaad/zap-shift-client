import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiUserRemove } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRider = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    console.log(rider.email)
    axiosSecure.patch(`rider-approved/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `${status}`,
          text: `Rider request has been ${status}.`,
          icon: "success",
        });
      }
    });
  };

  const handleApproveRider = (rider) => {
    updateRider(rider, "approved");
  };

  const rejectRider = (rider) => {
    updateRider(rider, "rejected");
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          title: `Deleted`,
          text: `Rider request has been Deleted.`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold text-secondary">
          Riders Approval: {riders.length}
        </h2>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>NID</th>
                <th>Region</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.nid}</td>
                  <td>{rider.ridersRegion}</td>
                  <td>{rider.age}</td>
                  <td>
                    {rider.status === "pending" ||
                    rider.status === "rejected" ? (
                      <span className="text-red-500">{rider.status}</span>
                    ) : (
                      <span className="text-green-500">{rider.status}</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApproveRider(rider)}
                      className="btn">
                      <RiUserAddFill />
                    </button>
                    <button
                      onClick={() => rejectRider(rider)}
                      className="btn mx-2">
                      <HiUserRemove />
                    </button>
                    <button
                      onClick={() => handleDelete(rider._id)}
                      className="btn">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveRider;
