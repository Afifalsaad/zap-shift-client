import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser, UpdateUserProfile, googleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImage = data.photo[0];

    const email = data.email;
    const password = data.password;
    registerUser(email, password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImage);

        const image_API_KEY = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imagePost_key
        }`;

        axios.post(image_API_KEY, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          // create user in the database
          const userInfo = {
            email: data.email,
            name: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            // if (res.data.insertedId) {
            console.log("user inserted in the database", res.data);
            // }
          });

          // update profile
          UpdateUserProfile(userProfile).then(() => {});
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "oops!",
          text: error.message,
          icon: "success",
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        Swal.fire({
          title: "Account Created Successfully",
          icon: "success",
        });

        // create user in the database
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((result) => {
          if (result.data.insertedId) {
            Swal.fire({
              title: "Logged In",
              icon: "success",
            });
            navigate(location?.state || "/");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "oops!",
          text: { error },
          icon: "success",
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Name Field */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            {/* Photo Field */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input"
              placeholder="Your Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}

            {/* Email Field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 character long.</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have a big letter , a small latter , a special
                character and a number.
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>

        <p>
          Already have an account?
          <Link
            state={location.state}
            className="text-blue-900 underline"
            to="/login">
            LogIn
          </Link>
        </p>

        {/* Google Login btn */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
