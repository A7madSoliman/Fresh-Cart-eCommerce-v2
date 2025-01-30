import EmailIcon from "@mui/icons-material/Email";
import InputIcon from "@mui/icons-material/Input";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Components/Context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  const { token, setToken } = useContext(userContext);
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const inputType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot exceed 30 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      const id = toast.loading("Logging in...");
      try {
        const option = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
          method: "POST",
          data: values,
        };

        const { data } = await axios.request(option);
        toast.dismiss(id);
        toast.success(data.message, { duration: 2000 });

        setTimeout(() => {
          if (data.message === "success") {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
          }
        }, 2000);
      } catch (error) {
        toast.dismiss(id);
        toast.error(error.response.data.message, { duration: 1000 });
        setErrorMsg(error.response.data.message);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login </title>
        <meta name="description" content="Welcome to Login page" />
      </Helmet>
      <section className="mt-20 container max-w-2xl">
        <div className=" my-3 flex justify-center items-center gap-2">
          <InputIcon fontSize="large" color="primary" />
          <h2 className="text-2xl text-black font-bold">Login</h2>
        </div>

        <form className="my-2" onSubmit={formik.handleSubmit}>
          <div className="flex border-b-2 border-blue-100 my-7 mx-5 p-1">
            <input
              autoComplete="off"
              type="email"
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="w-2/12 flex justify-center items-center">
              <EmailIcon fontSize="small" color="primary" />
            </div>
          </div>

          <div className="flex border-b-2 border-blue-100 my-7 mx-5 p-1">
            <input
              type={passwordType}
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="w-2/12 flex justify-center items-center cursor-pointer">
              <VisibilityOffIcon fontSize="small" onClick={inputType} />
            </div>
          </div>
          {errorMsg ? (
            <div className="error-message  text-red-500">* {errorMsg}</div>
          ) : (
            ""
          )}
          <div className="mx-5 flex justify-end ">
            <Link
              to="/auth/forgetpassword"
              className="text-black cursor-pointer font-semibold text-sm hover:text-primary"
            >
              Forget Your Password?
            </Link>
          </div>

          <div className="mx-5 my-7 py-2 flex justify-center items-center">
            <button type="submit" className="btn text-center w-8/12">
              Login
            </button>
          </div>

          <div className="my-6 mx-6 py-2 flex justify-center items-center ">
            <Link
              to="/auth/signup"
              className="font-title font-semibold text-black text-sm cursor-pointer hover:text-primary"
            >
              Dont have an account? / Register
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
