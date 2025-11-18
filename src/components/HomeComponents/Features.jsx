import React from "react";
import liveTracking from "../../assets/live-tracking.png";
import safeDelivery from "../../assets/safe-delivery.png";

const Features = () => {

  return (
    <div className="py-20 border-y-2 border-dashed">
      <div className="flex items-center bg-[#eaeced] p-8 rounded-xl mb-5">
        <div className="pr-20 border-r-2 border-dashed">
          <img src={liveTracking} alt="" />
        </div>
        <div className="ml-10">
          <h1 className="text-secondary text-2xl mb-4 font-bold">
            Live Parcel Tracking
          </h1>
          <p>
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>
      <div className="flex items-center bg-[#eaeced] p-8 rounded-xl mb-5">
        <div className="pr-20 border-r-2 border-dashed">
          <img src={safeDelivery} alt="" />
        </div>
        <div className="ml-10">
          <h1 className="text-secondary text-2xl mb-4 font-bold">
            100% Safe Delivery
          </h1>
          <p>
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>
      <div className="flex items-center bg-[#eaeced] p-8 rounded-xl mb-5">
        <div className="pr-20 border-r-2 border-dashed">
          <img src={safeDelivery} alt="" />
        </div>
        <div className="ml-10">
          <h1 className="text-secondary text-2xl mb-4 font-bold">
            100% Safe Delivery
          </h1>
          <p>
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
