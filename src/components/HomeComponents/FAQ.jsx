import React from "react";
import { GoArrowUpLeft } from "react-icons/go";

const FAQ = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center my-24">
        <h1 className="text-4xl text-secondary font-bold my-4">Frequently Asked Question (FAQ)</h1>
        <p className="text-[#7a7a7a]">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
        How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm">
        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
        Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
        Does it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
      <div className="flex items-center justify-center my-8">
        <button className="btn btn-primary text-secondary font-bold">See More FAQ's </button>
        <GoArrowUpLeft className="text-2xl font-semibold text-primary rotate-90 p-1 border h-8 w-8 bg-secondary rounded-full"/>
      </div>
    </div>
  );
};

export default FAQ;
