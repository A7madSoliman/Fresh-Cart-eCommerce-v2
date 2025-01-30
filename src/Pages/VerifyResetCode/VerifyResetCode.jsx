import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  const navigate = useNavigate();
  async function resetCode(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting ...");
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success(data.status);

      setTimeout(() => {
        if (data.status === "Success") {
          navigate("/auth/resetpassword");
        }
      }, 2000);
    } catch (error) {
      toast.error("Code Is Wrong");
      toast.dismiss(id);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: resetCode,
  });

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
        <meta name="description" content="Welcome to ResetCode page" />
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
          <h2 className="text-lg text-black font-bold">Reset Code</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex border-b-2 border-blue-100 my-7 mx-5 p-1">
            <input
              autoComplete="off"
              type="text"
              className="w-11/12 bg-transparent outline-none placeholder-gray-500"
              placeholder="Code"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              }}
            />
            <div className="w-2/12 flex justify-center items-center">
              <PasswordIcon fontSize="small" color="primary" />
            </div>
          </div>

          <div className="mx-5 my-7 py-2 flex justify-center items-center">
            <button type="submit" className="btn text-center w-8/12">
              Reset Code
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
