import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InfoIcon from "@mui/icons-material/Info";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContext } from "../../Components/Context/User.context";
import { cartContext } from "../../Components/Context/Cart.context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

export default function CheckOut() {
  const { token } = useContext(userContext);
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    shippingAddress: Yup.object({
      city: Yup.string()
        .required("City is required")
        .min(3, "City must be at least 3 characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid"),
      details: Yup.string()
        .required("Address details are required")
        .min(10, "Address details must be at least 10 characters"),
    }),
  });

  async function createCashOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      const { data } = await axios.request(options);
      setCartInfo([]);
      console.log("Order created successfully:", data);
      if (data.status === "success") {
        toast.success("Order created successfully");
        setTimeout(() => {
          navigate("/allorders");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  }

  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5174`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      const { data } = await axios.request(options);
      toast.loading("Waiting the proccess");
      setTimeout(() => {
        if (data.status === "success") {
          window.location.href = data.session.url;
        }
      }, 3000);
      console.log(data);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      if (orderType === "cash") createCashOrder(values);
      else createOnlineOrder(values);
      console.log(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Check Out</title>
        <meta name="description" content="Welcome to CheckOut page" />
      </Helmet>

      <section className="mt-10">
        <h2 className="text-primary text-2xl font-semibold flex items-center gap-1">
          <Link className="mr-4" to="/cart">
            <ArrowBackIcon
              className="bg-primary hover:bg-blue-700 rounded-full text-white"
              fontSize="large"
            />
          </Link>{" "}
          Shopping Address <ShoppingCartIcon color="inherit" fontSize="large" />
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* City Input */}
          <div className="flex items-center justify-between border-b-2 border-blue-100 my-7 p-2">
            <input
              className="w-11/12 bg-transparent outline-none placeholder-gray-500 text-lg"
              type="text"
              placeholder="City"
              autoComplete="off"
              name="shippingAddress.city"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <LocationCityIcon fontSize="medium" className="text-orange-500" />
          </div>
          {formik.touched.shippingAddress?.city &&
          formik.errors.shippingAddress?.city ? (
            <div className="text-red-500 text-sm ml-2">
              * {formik.errors.shippingAddress.city}
            </div>
          ) : null}

          {/* Phone Input */}
          <div className="flex items-center justify-between border-b-2 border-blue-100 my-7 p-2">
            <input
              className="w-11/12 bg-transparent outline-none placeholder-gray-500 text-lg"
              type="tel"
              placeholder="Phone Number"
              autoComplete="off"
              name="shippingAddress.phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <LocalPhoneIcon fontSize="medium" className="text-green-500" />
          </div>
          {formik.touched.shippingAddress?.phone &&
          formik.errors.shippingAddress?.phone ? (
            <div className="text-red-500 text-sm ml-2">
              * {formik.errors.shippingAddress.phone}
            </div>
          ) : null}

          {/* Address Details Input */}
          <div className="flex items-center justify-between border-b-2 border-blue-100 my-7 p-2">
            <input
              className="w-11/12 bg-transparent outline-none placeholder-gray-500 text-lg"
              type="text"
              placeholder="Address Details"
              autoComplete="off"
              name="shippingAddress.details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoIcon fontSize="medium" color="primary" />
          </div>
          {formik.touched.shippingAddress?.details &&
          formik.errors.shippingAddress?.details ? (
            <div className="text-red-500 text-sm ml-2 mb-4">
              * {formik.errors.shippingAddress.details}
            </div>
          ) : null}

          {/* Payment Buttons */}
          <button
            onClick={() => {
              setOrderType("cash");
            }}
            type="submit"
            className="btn text-white font-semibold mr-5"
          >
            Payment Cash
          </button>
          <button
            onClick={() => {
              setOrderType("online");
            }}
            type="submit"
            className="btn text-white bg-green-500 hover:bg-green-700 font-semibold"
          >
            Payment Online
          </button>
        </form>
      </section>
    </>
  );
}
