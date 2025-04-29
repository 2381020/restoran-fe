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
  const { getToken } = useAuth(); // ambil token user

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = Number(localStorage.getItem("userId")) || 1; // fallback buat testing

  // Fetch Cart Items from API
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

  // Handle Delete Cart Item
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

  // Handle Update Item Quantity
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

  if (loading) return <div>Memuat keranjang...</div>;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.menu.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Keranjang Anda kosong.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg"
              >
                <img
                  src={item.menu.imageUrl}
                  alt={item.menu.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl">{item.menu.name}</h3>
                  <p className="text-gray-600">
                    Rp {item.menu.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menu.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.menu.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.menu.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: Rp{" "}
              {totalPrice.toLocaleString()} {/* Total price correctly formatted */}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 bg-bg-[#333333] text-[#FFD93D] rounded-lg hover:bg-bg-[#333333]"
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
