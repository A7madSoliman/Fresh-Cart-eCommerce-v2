import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Components/Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  const isOrdersEmpty = !orders || orders.length === 0;

  const formatPrice = (price) => {
    return price.toLocaleString("en-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Welcome to Orders page" />
      </Helmet>

      <section className="mt-10 container max-w-full">
        <h2 className="text-primary text-2xl font-semibold flex items-center gap-1">
          Orders <ShoppingCartIcon color="inherit" fontSize="large" />
        </h2>
        {isOrdersEmpty ? (
          <div className="bg-blue-50 py-16 mt-20 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-10">
              There are no orders yet.
            </h3>
            <Link to="/" className="btn text-md">
              ADD YOUR FIRST PRODUCT TO CART
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="order border border-gray-400 rounded p-4 mt-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-gray-500 font-semibold">Order ID</h2>
                  <h3 className="font-semibold"># {order._id}</h3>
                  <h3 className="font-semibold">
                    Total Order Price : {formatPrice(order.totalOrderPrice)}
                  </h3>
                </div>
                <div>
                  {order.isDelivered ? (
                    <span className="font-bold text-black bg-lime-500 px-4 py-2 rounded-lg inline-block me-4 ">
                      تم التوصيل
                    </span>
                  ) : (
                    <span className="font-bold text-black bg-primary px-4 py-2 rounded-lg inline-block me-4 ">
                      قيد التوصيل
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="font-bold text-black bg-lime-500 px-4 py-2 rounded-lg inline-block  ">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="font-bold text-black bg-red-500 px-4 py-2 rounded-lg inline-block  ">
                      غير مدفوع
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-12 mt-5 gap-3">
                {order.cartItems.map((product) => (
                  <div
                    key={product.product._id}
                    className="product border border-gray-300 rounded p-3 col-span-6 sm:col-span-4 md:col-span-2"
                  >
                    <img
                      src={product.product.imageCover}
                      alt="image Cover"
                      className="w-full h-32 object-cover"
                    />
                    <h3 className="text-sm font-semibold my-2">
                      {product.product.title}
                    </h3>
                    <span className="font-semibold ">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
