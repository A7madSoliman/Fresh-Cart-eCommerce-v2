import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState(null);

  const [password, setPassword] = useState("password");

  const inputType = () =>
    setPassword(password === "password" ? "text" : "password");

  const validationSchema = Yup.object({
    name: Yup.string().required("Username is required").min(3).max(20),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required").min(8).max(30),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string().required("Phone Number is required").min(11).max(14),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const option = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
          method: "POST",
          data: values,
        };

        let id = toast.loading("Registering...", { duration: 1000 });

        const { data } = await axios.request(option);

        toast.dismiss(id);
        toast.success(data.message, { duration: 3000 });

        setTimeout(() => {
          if (data.message === "success") {
            navigate("/auth/login");
            formik.resetForm();
          }
        }, 3000);
      } catch (error) {
        toast.error(error.response.data.message, { duration: 2000 });
        setErrorMsg(error.response.data.message);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Welcome to SignUp page" />
      </Helmet>
      <section className="mt-20 container max-w-2xl">
        <div className="text-center  my-3 flex justify-center items-center gap-2">
          <AppRegistrationIcon fontSize="large" color="primary" />
          <h2 className="text-2xl text-black font-bold">Register</h2>
        </div>
        <form className="my-2" onSubmit={formik.handleSubmit}>
          <div className="flex border-b-2 border-blue-200 my-4 p-1">
            <input
              autoComplete="off"
              type="text"
              className="w-11/12 bg-transparent outline-none  placeholder-gray-500"
              placeholder="Username"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div className="w-2/12 flex justify-center items-center">
              <PersonIcon fontSize="small" color="primary" />
            </div>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message ">* {formik.errors.name}</div>
          ) : (
            ""
          )}

          <div className="flex border-b-2 border-blue-200 my-4 p-1">
            <input
              autoComplete="off"
              type="email"
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="w-2/12 flex justify-center items-center">
              <EmailIcon fontSize="small" color="info" />
            </div>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">* {formik.errors.email}</div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div className="text-red-500 ml-5  ">* {errorMsg}</div>
          ) : (
            ""
          )}

          <div className="flex border-b-2 border-blue-200 my-4 p-1">
            <input
              type={password}
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div className="w-2/12 flex justify-center items-center cursor-pointer">
              <VisibilityOffIcon fontSize="small" onClick={inputType} />
            </div>
          </div>

          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">* {formik.errors.password}</div>
          ) : (
            ""
          )}

          <div className="flex border-b-2 border-blue-200 my-4 p-1">
            <input
              type={password}
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Confirm Password"
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            <div className="w-2/12 flex justify-center items-center cursor-pointer">
              <VisibilityOffIcon fontSize="small" onClick={inputType} />
            </div>
          </div>

          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="error-message">* {formik.errors.rePassword}</div>
          ) : (
            ""
          )}

          <div className="flex border-b-2 border-blue-200 my-4 p-1">
            <input
              autoComplete="off"
              type="tel"
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Phone Number"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <div className="w-2/12 flex justify-center items-center">
              <LocalPhoneIcon fontSize="small" color="success" />
            </div>
          </div>

          {formik.touched.phone && formik.errors.phone ? (
            <div className="error-message ">* {formik.errors.phone}</div>
          ) : (
            ""
          )}

          <div className="ms-5 my-6 py-2 flex justify-center items-center">
            <button type="submit" className="btn text-center w-8/12">
              Register
            </button>
          </div>

          <div className="my-4 mx-4 py-2 flex justify-center items-center cursor-pointer">
            <Link
              to="/auth/login"
              className="font-title font-semibold text-black text-sm hover:text-primary"
            >
              Already have an account? / Login
            </Link>
          </div>
        </form>{" "}
      </section>
    </>
  );
}
