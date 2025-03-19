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
          name: "Adidas Ultraboost 22",
          price: 1599000,
          size: 26,
          image: "url-to-image2",
        },
        {
          name: "Puma RS-X",
          price: 1299000,
          size: 25,
          image: "url-to-image3",
        },
      ],
      total: 7890000,
    },
    {
      id: "#7812658",
      from: "Berlin, UK",
      to: "Darla’s Home, Indonesia",
      estimatedArrival: "9 Jul 2024",
      status: "On Deliver",
      items: [
        {
          name: "Nike Gamma Force",
          price: 1399000,
          size: 24,
          image: "url-to-image4",
        },
        {
          name: "New Balance 574",
          price: 1499000,
          size: 27,
          image: "url-to-image5",
        },
        {
          name: "Reebok Club C",
          price: 1199000,
          size: 25,
          image: "url-to-image6",
        },
      ],
      total: 2900000,
    },
  ],
  arrived: [
    {
      id: "#7890981",
      from: "7812657",
      to: "Darla’s Home, Indonesia",
      estimatedArrival: "9 Jul 2024",
      status: "Arrived",
      items: [
        {
          name: "Nike Gamma Force",
          price: 1399000,
          size: 24,
          image: "url-to-image4",
        },
        {
          name: "New Balance 574",
          price: 1499000,
          size: 27,
          image: "url-to-image5",
        },
        {
          name: "Reebok Club C",
          price: 1199000,
          size: 25,
          image: "url-to-image6",
        },
      ],
      total: 2900000,
    },
  ],
  canceled: [],
};

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 lg:ml-24">
      {/* Header */}
      <div className="w-full text-left">
        <h2 className="text-lg font-semibold sm:text-xl">Orders</h2>
        <span className="text-gray-600 text-xs sm:text-sm">All of your orders.</span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-start bg-gray-100 rounded-full p-1 w-full max-w-sm sm:max-w-md mx-auto text-xs">
        {["shipping", "arrived", "canceled"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[80px] py-1 px-2 rounded-full transition-all text-[10px] sm:text-sm ${
              activeTab === tab ? "bg-white shadow-md" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="capitalize">{tab}</span>
            {ordersData[tab].length > 0 && (
              <span className="ml-1 text-[9px] sm:text-xs bg-black text-white rounded-full px-2">
                {ordersData[tab].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="w-full">
        {ordersData[activeTab].length === 0 ? (
          <p className="text-center text-gray-500 text-xs sm:text-sm">No orders found.</p>
        ) : (
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {ordersData[activeTab].map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-md p-3 text-[10px] sm:text-sm w-full max-w-xs mx-auto sm:max-w-full"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold truncate">ID: {order.id}</p>
                  <span className="text-[9px] sm:text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 truncate text-[9px] sm:text-xs">
                  {order.from} → {order.to}
                </p>
                <p className="text-gray-500 text-[9px] sm:text-xs">
                  Arrival: <strong>{order.estimatedArrival}</strong>
                </p>

                {/* Order Items (Scrollable) */}
                <div className="mt-1 space-y-1 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 border-b py-1 flex-wrap"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-[9px] sm:text-sm">{item.name}</p>
                        <p className="text-gray-500 text-[8px] sm:text-xs">Size: {item.size}</p>
                        <p className="font-semibold text-[9px] sm:text-sm">
                          ₹ {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-2 flex justify-between items-center">
                  <p className="font-semibold text-[10px] sm:text-sm">
                    ₹ {order.total.toLocaleString()}
                  </p>
                  <button
                    className="btn-fill"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500">
                ✖
              </button>
            </div>

            {/* Order Information */}
            <p className="text-gray-600 text-sm">Order ID: {selectedOrder.id}</p>
            <p className="text-gray-600 text-sm">From: {selectedOrder.from}</p>
            <p className="text-gray-600 text-sm">To: {selectedOrder.to}</p>
            <p className="text-gray-600 text-sm">Estimated Arrival: {selectedOrder.estimatedArrival}</p>
            <p className="text-gray-600 text-sm">Status: {selectedOrder.status}</p>

            {/* Item List */}
            <div className="mt-4 space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 border-b pb-2">
                  <div className="w-12 h-12 bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">Size: {item.size}</p>
                    <p className="font-semibold">₹ {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-4 border-t pt-2">
              <p className="font-semibold text-sm">Total: ₹ {selectedOrder.total.toLocaleString()}</p>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
