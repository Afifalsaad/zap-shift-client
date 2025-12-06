import React from "react";
import agent from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "ridersRegion" });

  const districtsByRegions = (region) => {
    const filteredRegions = serviceCenters.filter((c) => c.region === region);
    const districts = filteredRegions.map((r) => r.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Submitted",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="bg-white p-8 rounded-xl ">
        <div>
          <h2 className="text-4xl font-bold text-secondary mb-6">Be a Rider</h2>
          <p className="text-secondary text-[10px] pb-6 border-b border-[#e4e4e4]">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal <br /> packages to business shipments —
            we deliver on time, every time.
          </p>
        </div>

        {/* form */}
        <div className="grid grid-cols-2 gap-10 mt-6">
          <form onSubmit={handleSubmit(handleRiderApplication)}>
            <div>
              <fieldset className="fieldset flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    {/* Name */}
                    <label className="font-bold text-md">Name</label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      {...register("name")}
                      className="input w-full mb-4"
                      placeholder="Name"
                    />

                    {/* Email */}
                    <label className="font-bold text-md">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      {...register("email")}
                      className="input w-full mb-4"
                      placeholder="Email"
                    />

                    {/* NID */}
                    <label className="font-bold text-md">NID</label>
                    <input
                      type="text"
                      {...register("nid")}
                      className="input w-full mb-4"
                      placeholder="Your NID number"
                    />
                  </div>

                  <div>
                    {/* Age */}
                    <label className="font-bold text-md">Age</label>
                    <input
                      type="text"
                      {...register("age")}
                      placeholder="Your age"
                      className="input w-full mb-4"></input>

                    {/* Phone Number */}
                    <label className="font-bold text-md">Phone No.</label>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="input w-full mb-4"
                      placeholder="Phone No."
                    />

                    {/* Riders Region */}
                    <label className="font-bold text-md">Region</label>
                    <select
                      {...register("ridersRegion")}
                      defaultValue="Select Your Region"
                      className="select w-full mb-4">
                      <option>Select Your Region</option>
                      {regions.map((r, index) => (
                        <option value={r} key={index}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Riders's District */}
                <label className="font-bold text-md">District</label>
                <select
                  {...register("ridersDistrict")}
                  defaultValue="Select Your District"
                  className="select w-full mb-4">
                  <option>Select Your District</option>
                  {districtsByRegions(senderRegion).map((r, index) => (
                    <option value={r} key={index}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* About You */}
                <label className="font-bold text-md">About You</label>
                <textarea
                  {...register("riderDetails")}
                  className="border border-[#d1d1d1] p-1 rounded-md"
                  rows="6"
                  placeholder="Tell us about yourself"></textarea>
              </fieldset>
            </div>
            <button className="btn w-full mt-4 btn-primary text-secondary">
              Submit
            </button>
          </form>
          <div>
            <img src={agent} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
