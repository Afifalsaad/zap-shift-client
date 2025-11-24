import React from "react";
import { useForm, useWatch, Watch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  //   console.log()

  const districtsByRegions = (region) => {
    const filteredRegions = serviceCenters.filter((c) => c.region === region);
    const districts = filteredRegions.map((r) => r.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.ParcelType === "document";
    const parcelWeight = parseFloat(data.ParcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost
    Swal.fire({
      title: "Agree with our charge?",
      text: `Your cost will be ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data)
        .then((res) => {
          console.log("after saving data", res.data);
        });

        // Swal.fire({
        //   title: "Confirmed!",
        //   text: "We receive your order",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">Send A Parcel</h2>
        <p className="font-bold text-xl pb-6 border-b border-[#e4e4e4]">
          Enter your parcel details
        </p>
        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* Parcel Type */}
          <div className="my-6">
            <label className="label mr-8">
              <input
                type="radio"
                {...register("ParcelType")}
                value="document"
                className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label">
              <input
                type="radio"
                {...register("ParcelType")}
                value="non-document"
                className="radio"
              />
              Non-Document
            </label>
          </div>

          {/* Parcel Name and Weight */}
          <div className="flex gap-10 border-b border-[#e4e4e4] pb-4">
            <fieldset className="fieldset flex-1">
              <label className="font-bold">Parcel Name</label>
              <input
                type="text"
                {...register("ParcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>
            <fieldset className="fieldset flex-1">
              <label className="font-bold">Parcel Weight (kg)</label>
              <input
                type="number"
                {...register("ParcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight"
              />
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Sender Details */}
            <div>
              <h3 className="text-2xl my-6 font-bold">Sender Details</h3>
              <fieldset className="fieldset flex-1">
                {/* Sender Name */}
                <label className="font-bold text-md">Sender Name</label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  {...register("senderName")}
                  className="input w-full mb-4"
                  placeholder="Name"
                />

                {/* Sender Address */}
                <label className="font-bold text-md">Sender Address</label>
                <input
                  type="text"
                  {...register("senderAddress")}
                  className="input w-full mb-4"
                  placeholder="Address"
                />

                {/* Sender Email */}
                <label className="font-bold text-md">Sender Email</label>
                <input
                  defaultValue={user?.email}
                  type="email"
                  {...register("senderEmail")}
                  className="input w-full mb-4"
                  placeholder="Email"
                />

                {/* Sender Phone Number */}
                <label className="font-bold text-md">Sender Phone No.</label>
                <input
                  type="text"
                  {...register("senderPhoneNum")}
                  className="input w-full mb-4"
                  placeholder="Phone No."
                />

                {/* Sender's Region */}
                <label className="font-bold text-md">Region</label>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a color"
                  className="select w-full mb-4">
                  <option>Select Your Region</option>
                  {regions.map((r, index) => (
                    <option value={r} key={index}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* Sender's District */}
                <label className="font-bold text-md">District</label>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Select Your District"
                  className="select w-full mb-4">
                  <option>Select Your District</option>
                  {districtsByRegions(senderRegion).map((r, index) => (
                    <option value={r} key={index}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* PickUp Instruction*/}
                <label className="font-bold text-md">PickUp Instruction</label>
                <textarea
                  className="border border-[#d1d1d1] p-1 rounded-md"
                  name=""
                  id=""
                  rows="6"
                  placeholder="PickUp Instruction"></textarea>
              </fieldset>
            </div>

            {/* Receiver details */}
            <div>
              <h3 className="text-2xl my-6 font-bold">Receiver Details</h3>
              <fieldset className="fieldset flex-1">
                {/* Receiver Name */}
                <label className="font-bold text-md">Receiver Name</label>
                <input
                  type="text"
                  {...register("receiverName")}
                  className="input w-full mb-4"
                  placeholder="Receiver Name"
                />

                {/* Receiver Address */}
                <label className="font-bold text-md">Receiver Address</label>
                <input
                  type="text"
                  {...register("receiverAddress")}
                  className="input w-full mb-4"
                  placeholder="receiverAddress"
                />

                {/* Receiver Email */}
                <label className="font-bold text-md">Receiver Email</label>
                <input
                  type="email"
                  {...register("receiverEmail")}
                  className="input w-full mb-4"
                  placeholder="Email"
                />

                {/* Receiver Contact Number */}
                <label className="font-bold text-md">
                  Receiver Contact No.
                </label>
                <input
                  type="text"
                  {...register("receiverPhoneNum")}
                  className="input w-full mb-4"
                  placeholder="Phone No."
                />

                {/* Receiver's Region */}
                <label className="font-bold text-md">Region</label>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Select Your Region"
                  className="select w-full mb-4">
                  <option>Select Your Region</option>
                  {regions.map((r, index) => (
                    <option value={r} key={index}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* Receiver District */}
                <label className="font-bold text-md">District</label>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Select Your District"
                  className="select w-full mb-4">
                  <option>Select Your District</option>
                  {districtsByRegions(receiverRegion).map((r, index) => (
                    <option value={r} key={index}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* Delivery Instruction */}
                <label className="font-bold text-md">
                  Delivery Instruction
                </label>
                <textarea
                  className="border border-[#d1d1d1] p-1 rounded-md"
                  name=""
                  id=""
                  rows="6"
                  placeholder="Delivery Instruction"></textarea>
              </fieldset>
            </div>
          </div>
          <p className="my-10">* PickUp Time 4pm-7pm Approx.</p>
          {/* Button */}
          <input
            className="btn btn-primary text-black"
            type="submit"
            value="Proceed to Confirm Booking"
          />
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
