import React from "react";
import service from "../../assets/service.png";

const services = [
  {
    icon: service,
    title: "Express  & Standard Delivery",
    description:
      "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
  },
  {
    icon: service,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: service,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: service,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: service,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: service,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <div className="bg-secondary text-white p-16 rounded-3xl">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl mb-4">Our Services</h1>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {services.map((s) => (
          <div className="border p-10 flex flex-col items-center text-center bg-white text-secondary rounded-3xl hover:bg-primary hover:cursor-pointer">
            <div>
            <img src={s.icon} alt="" />
            </div>
            <h3 className="font-bold my-3">{s.title}</h3>
            <p className="text-[#888888]">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
