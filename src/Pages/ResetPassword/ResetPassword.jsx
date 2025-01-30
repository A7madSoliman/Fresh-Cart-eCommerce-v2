import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const inputType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  async function resetPassword(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      id = toast.loading("Waiting ...");
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("Password Reset Done");

      setTimeout(() => {
        if (data.token) {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      toast.error("The password is not valid.");
      toast.dismiss(id);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    onSubmit: resetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Welcome to ResetPassword page" />
      </Helmet>
      <div className="mt-20 container max-w-2xl">
        <button
          onClick={() => navigate("/auth/forgetpassword")}
          className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 m-2 hover:bg-blue-700"
        >
          <ArrowBackIcon fontSize="medium" color="inherit" />
        </button>

        <div className="flex text-center justify-center items-center gap-2">
          <PasswordIcon fontSize="large" color="primary" />
          <h2 className="text-lg text-black font-bold">Reset Password</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex border-b-2 border-blue-100 my-7 mx-5 p-1">
            <input
              autoComplete="off"
              type="text"
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="flex justify-center items-center">
              <EmailIcon fontSize="small" color="primary" />
            </div>
          </div>
          <div className="flex border-b-2 border-blue-100 my-7 mx-5 p-1">
            <input
              autoComplete="off"
              type={passwordType}
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="flex justify-center items-center">
              <PasswordIcon
                fontSize="small"
                color="primary"
                onClick={inputType}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="mx-5 my-7 py-2 flex justify-center items-center">
            <button type="submit" className="btn text-center w-8/12">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
