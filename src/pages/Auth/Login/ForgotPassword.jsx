import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const { updatePass } = useAuth();

  const handleForgotPass = (data) => {
    console.log("after click update password", data);
    updatePass(data.email).then(() => {
      console.log("after update pass");
    });
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleForgotPass)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />
              <button className="btn btn-neutral mt-4">Continue</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
