import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useAuth } from "../utils/AuthProvider";

// Type definitions
type CartItem = {
  price: number;
  id: number;
  quantity: number;
  menu: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

const Checkout = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const userId = Number(localStorage.getItem("userId")) || 1;

  const fetchCartItems = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Gagal memuat keranjang:", error);
      alert("Gagal memuat data checkout.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleConfirmOrder = async () => {
    if (!paymentMethod || !deliveryAddress) {
      alert("Mohon lengkapi metode pembayaran dan alamat pengiriman!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Keranjang kosong, tidak bisa membuat pesanan.");
      return;
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.menu.price * item.quantity,
      0
    );

    const orderData = {
      userId,
      paymentMethod,
      deliveryAddress,
      totalPrice,
      cartItems: cartItems.map((item) => ({
        menuId: item.menu.id,
        quantity: item.quantity,
        price: item.menu.price
      }))
    };

    try {
      const token = getToken();
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        navigate("/login");
        return;
      }

      console.log("Token yang dikirim:", token); // Log token di sini
      console.log("Order Data yang dikirim:", orderData);

      const response = await axios.post(
        `https://restoran-be.vercel.app/api/order/${userId}`, // Menyertakan userId di URL
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Periksa status respons menggunakan rentang kode sukses 2xx
      if (response.status >= 200 && response.status < 300) {
        alert("Pesanan berhasil dibuat!");
        setCartItems([]); // Kosongkan keranjang
        navigate("/orderhistory"); // Redirect ke riwayat pesanan
      } else {
        // Tangani kasus status selain sukses
        alert(`Terjadi kesalahan: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error saat membuat pesanan:", error);
      alert("Gagal membuat pesanan. Detail kesalahan ada di konsol.");
    }
  };

  if (loading) {
    return <div className="text-center p-6">Memuat checkout...</div>;
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.menu.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Checkout
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Keranjang kosong.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all"
            >
              <img
                src={item.menu.imageUrl}
                alt={item.menu.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.menu.name}
                </h3>
                <p className="text-gray-600">
                  Harga: Rp {item.menu.price.toLocaleString()}
                </p>
                <p className="text-gray-600">Jumlah: {item.quantity}</p>
              </div>
              <p className="font-semibold text-green-500">
                Rp {(item.menu.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Detail Pemesanan
            </h3>

            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Metode Pembayaran
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih metode pembayaran</option>
                <option value="e-wallet">E-Wallet</option>
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Cash On Delivery</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="deliveryAddress"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Alamat Pengiriman
              </label>
              <textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Masukkan alamat pengiriman"
              />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">
                Total Harga: Rp {totalPrice.toLocaleString()}
              </p>
              <button
                onClick={handleConfirmOrder}
                className="px-6 py-2 bg-[#333333] text-[#FFD93D] rounded-lg hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
