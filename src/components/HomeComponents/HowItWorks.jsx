import React from "react";
import bookingIcon from "../../assets/bookingIcon.png";

const info = [
  {
    icon: bookingIcon,
    title: "Booking pick and drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: bookingIcon,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: bookingIcon,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: bookingIcon,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto my-28">
      <h1 className="text-secondary text-xl font-bold my-4">How Its Works</h1>
      <div className="grid grid-cols-4 gap-4">
        {info.map((i,index) => (
          <div key={index} className="p-6 bg-[#eaeced] rounded-xl">
            <div>
              <div>
                <img src={i.icon} alt="" />
              </div>
              <div>
                <h1 className="text-secondary font-semibold my-3">{i.title}</h1>
                <p className="text-[#606060]">{i.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
