import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa6";
import { TbShieldOff } from "react-icons/tb";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRole = (id) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Admin Added",
          icon: "success",
        });
      }
    });
  };

  const removeAdmin = (id) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Admin Removed",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-secondary">
        Users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => removeAdmin(user._id)}
                      className="btn bg-red-400">
                      <TbShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRole(user._id)}
                      className="btn bg-green-400">
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>Actions</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
