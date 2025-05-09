import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("Processing");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/v1/order/user-orders`,
      { withCredentials: true }
    );
    setOrders(response.data.data.orders);
  } catch (error) {
    toast.error("Failed to fetch orders");
    console.error("Error fetching orders:", error);
  } finally {
    setLoading(false);
  }
};

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === "Processing") return order.status === "Processing";
    if (activeTab === "Delivered") return order.status === "Delivered";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    return true;
  });

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* Header */}
      <Breadcrumbs />

      <div className="w-full text-left">
        <h2 className="text-lg font-semibold sm:text-xl">Orders</h2>
        <span className="text-gray-600 text-xs sm:text-sm">All of your orders.</span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-start bg-gray-100 rounded-full p-1 w-full max-w-sm sm:max-w-md mx-auto text-xs">
        {["Processing", "Delivered", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[80px] py-1 px-2 rounded-full transition-all text-[10px] sm:text-sm ${
              activeTab === tab ? "bg-white shadow-md" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="capitalize">{tab}</span>
            {filteredOrders.length > 0 && (
              <span className="ml-1 text-[9px] sm:text-xs bg-black text-white rounded-full px-2">
                {filteredOrders.filter(o => o.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-xs sm:text-sm">No orders found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-md p-4 text-xs sm:text-sm w-full max-w-xs mx-auto sm:max-w-full hover:shadow-xl transition-shadow"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold truncate">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <span className={`text-[9px] sm:text-xs px-2 py-0.5 rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <p className="text-gray-500 text-xs mb-1">
                  Placed on: {formatDate(order.createdAt)}
                </p>
                
                <p className="text-gray-500 text-xs mb-3">
                  Payment: <span className="font-medium">{order.paymentMethod}</span> ({order.paymentStatus})
                </p>

                {/* Order Items (Scrollable) */}
                <div className="mt-1 space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 border-b pb-2">
                      {item.productSnapshot.images?.length > 0 ? (
                        <img 
                          src={item.productSnapshot.images[0]} 
                          alt={item.productSnapshot.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-xs sm:text-sm">{item.productSnapshot.name}</p>
                        <p className="text-gray-500 text-[8px] sm:text-xs">Qty: {item.quantity}</p>
                        <p className="font-semibold text-xs sm:text-sm">
                          ₹{item.productSnapshot.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-2 flex justify-between items-center">
                  <p className="font-semibold text-sm">
                    Total: ₹{order.totalAmount.toLocaleString()}
                  </p>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs sm:text-sm bg-black  text-white px-3 py-1 rounded"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>

            {/* Order Information */}
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="font-medium">Order ID:</span> {selectedOrder._id}
              </p>
              <p className="text-sm">
                <span className="font-medium">Date:</span> {formatDate(selectedOrder.createdAt)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment Status:</span> {selectedOrder.paymentStatus}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h4 className="font-medium mb-1">Shipping Address</h4>
              {selectedOrder.shippingAddress && (
                <p className="text-sm">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},<br />
                  {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zip},<br />
                  {selectedOrder.shippingAddress.country}
                </p>
              )}
            </div>

            {/* Items List */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3">
                    {item.productSnapshot.images?.length > 0 ? (
                      <img 
                        src={item.productSnapshot.images[0]} 
                        alt={item.productSnapshot.name}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.productSnapshot.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      <p className="text-sm">₹{item.productSnapshot.price.toLocaleString()} each</p>
                      <p className="font-medium text-sm">
                        Subtotal: ₹{(item.productSnapshot.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-3">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Proof (if UPI) */}
            {selectedOrder.paymentMethod === "UPI" && selectedOrder.paymentProof?.paymentScreenshot && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Payment Proof</h4>
                <img 
                  src={selectedOrder.paymentProof.paymentScreenshot} 
                  alt="Payment proof" 
                  className="w-full max-w-xs mx-auto border rounded"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;