import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../social-login/SocialLogin";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, updateUserProfile } = useAuth();
  const handleRegistration = (data) => {
    console.log(data.photoURL[0]);
    const profileImg = data.photoURL[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image uploaded", res);
          //update user profile
          const updateProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(updateProfile)
            .then(() => {
              console.log("user profile updated");
              navigate(location.state || "/");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl ">
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">name is required</p>
          )}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register("photoURL", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photoURL?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 character longer</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p className="text-center">
          Already have an Account?{" "}
          <Link
            to={"/auth/login"}
            state={location?.state}
            className="text-blue-400 underline"
          >
            Please Login
          </Link>
        </p>
      </form>
      <div className="text-center mb-2 w-full">
        <SocialLogin />
      </div>
    </div>
  );
}

export default Register;
