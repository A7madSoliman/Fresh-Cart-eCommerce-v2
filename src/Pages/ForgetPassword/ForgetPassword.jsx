import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  async function forgetPassword(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      toast.dismiss(id);
      toast.success(data.message);
      console.log(data);

      setTimeout(() => {
        if (data.statusMsg === "success") {
          navigate("/auth/verifyresetcode");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error("Your email is not valid");
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,
    onSubmit: forgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Welcome to Forget Password page" />
      </Helmet>
      <div className="mt-20 container max-w-2xl">
        <button
          onClick={() => navigate("/auth/login")}
          className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 m-2 hover:bg-blue-700"
        >
          <ArrowBackIcon fontSize="medium" color="inherit" />
        </button>

        <div className="flex text-center justify-center items-center gap-2">
          <PasswordIcon fontSize="large" color="primary" />
          <h2 className="text-lg text-black font-bold">Forget Password</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
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
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mx-5">
              * Email Is {formik.errors.email}
            </div>
          ) : null}
          <div className="mx-5 my-7 py-2 flex justify-center items-center">
            <button type="submit" className="btn text-center w-8/12">
              Reset Password
            </button>
          </div>
        </form>
      </div>{" "}
    </>
  );
}
