import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useAuth } from "../utils/AuthProvider";

// Type definition for order
type Order = {
  id: number;
  totalPrice: number;
  paymentMethod: string;
  deliveryAddress: string;
  createdAt: string;
  status: string;
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = Number(localStorage.getItem("userId")) || 1;

  // Fetch the orders
  const fetchOrders = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`/api/order/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response data:", response.data); // Log the response to check the data structure
      setOrders(response.data || []); // Set the orders array if data is available
    } catch (error) {
      console.error("Gagal memuat riwayat pesanan:", error);
      alert("Gagal memuat riwayat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Call fetchOrders when the component mounts

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="animate-pulse text-xl text-gray-500">Memuat riwayat pesanan...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Riwayat Pesanan</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Anda belum memiliki pesanan.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col bg-white p-6 shadow-lg rounded-xl transition-all hover:shadow-xl"
            >
              <div className="flex justify-between mb-4">
                <p className="text-lg font-semibold text-gray-800">ID Pesanan: #{order.id}</p>
                <p className="text-sm text-gray-600">{order.status}</p>
              </div>
              <div className="mb-4 text-gray-700">
                <p className="text-sm"><strong>Metode Pembayaran:</strong> {order.paymentMethod}</p>
                <p className="text-sm"><strong>Alamat Pengiriman:</strong> {order.deliveryAddress}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-green-500">
                  Total Harga: Rp {order.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
