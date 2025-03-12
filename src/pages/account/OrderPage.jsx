import React, { useState } from "react";

const ordersData = {
  shipping: [
    {
      id: "#7812657",
      from: "Malang, Indonesia",
      to: "Emir’s House, Indonesia",
      estimatedArrival: "28 May 2024",
      status: "On Deliver",
      items: [
        {
          name: "Nike Air Max SYSTM",
          price: 1459000,
          size: 24,
          image: "url-to-image1",
        },
        {
          name: "Nike Air Rift",
          price: 1909000,
          size: 24,
          image: "url-to-image2",
        },
      ],
      total: 7890000,
    },
    {
      id: "#7812658",
      from: "Malang, Indonesia",
      to: "Emir’s House, Indonesia",
      estimatedArrival: "29 May 2024",
      status: "On Deliver",
      items: [
        {
          name: "Nike Air Max SYSTM",
          price: 1459000,
          size: 24,
          image: "url-to-image1",
        },
        {
          name: "Nike Air Rift",
          price: 1909000,
          size: 24,
          image: "url-to-image2",
        },
        {
          name: "Nike Air Rift",
          price: 1909000,
          size: 24,
          image: "url-to-image2",
        },
      ],
      total: 7990000,
    },
  ],
  arrived: [
    {
      id: "#7890981",
      from: "Berlin, UK",
      to: "Darla’s Home, Indonesia",
      estimatedArrival: "9 Jul 2024",
      status: "Arrived",
      items: [
        {
          name: "Nike Gamma Force",
          price: 1399000,
          size: 24,
          image: "url-to-image3",
        },
        {
          name: "Nike Cortez",
          price: 1299000,
          size: 24,
          image: "url-to-image4",
        },
      ],
      total: 2900000,
    },
  ],
  canceled: [],
};

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 lg:ml-24">
      {/* heading */}
      <div className="w-11/12 flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">Orders</h2>
        <span className="text-gray-600 text-sm">All of your orders.</span>
      </div>

      {/* tabs */}
      <div className="flex items-center mt-4 bg-gray-100 rounded-full p-2 w-full max-w-lg mx-auto">
        {["shipping", "arrived", "canceled"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${
              activeTab === tab ? "bg-white shadow-md" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {ordersData[tab].length > 0 && (
              <span className="ml-1 text-xs bg-black text-white rounded-full px-2 py-0.5">
                {ordersData[tab].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* orders */}
      <div className="mt-6">
        {ordersData[activeTab].length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {ordersData[activeTab].map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <span className="text-sm px-3 py-1 bg-green-200 text-green-700 rounded-full">
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  {order.from} → {order.to}
                </p>
                <p className="text-gray-500 text-sm">
                  Estimated Arrival: <strong>{order.estimatedArrival}</strong>
                </p>

                <div className="mt-3 space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border-b py-2"
                    >
                      <div className="w-16 h-16 bg-gray-200 flex-shrink-0"></div>
                      {/* Image Placeholder */}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-semibold">
                          ₹ {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <p className="font-semibold">
                    Total: ₹ {order.total.toLocaleString()}
                  </p>
                  <button className="bg-black text-white px-4 py-2 rounded-full">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
