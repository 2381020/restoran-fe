import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useAuth } from "../utils/AuthProvider";

// Type untuk Cart Item
type CartItem = {
  id: number;
  quantity: number;
  menu: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

const Cart = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.data);
    } catch (error) {
      console.error("Gagal memuat keranjang:", error);
      alert("Gagal memuat keranjang.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (menuId: number) => {
    try {
      const token = getToken();
      await axios.delete(`/api/cart/${userId}/${menuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId, menuId },
      });
      setCartItems((prev) => prev.filter((item) => item.menu.id !== menuId));
      alert("Item berhasil dihapus dari keranjang.");
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      alert("Gagal menghapus item dari keranjang.");
    }
  };

  const handleUpdateQuantity = async (menuId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      alert("Minimal quantity 1");
      return;
    }
    try {
      const token = getToken();
      await axios.patch(
        "/api/cart",
        {
          userId,
          menuId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.menu.id === menuId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Gagal update quantity:", error);
      alert("Gagal mengupdate jumlah.");
    }
  };

  if (loading) return <div className="p-6 text-center">Memuat keranjang...</div>;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.menu.price * item.quantity,
    0
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
        Keranjang Belanja
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Keranjang Anda kosong.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={item.menu.imageUrl}
                  alt={item.menu.name}
                  className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-medium">{item.menu.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Rp {item.menu.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-end flex-wrap">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menu.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menu.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.menu.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-base sm:text-lg font-semibold">
              Total: Rp {totalPrice.toLocaleString()}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-auto px-4 py-2 bg-[#333333] text-[#FFD93D] rounded-lg hover:bg-[#444444] text-center"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
