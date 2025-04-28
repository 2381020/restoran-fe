import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";

// Define the types for your menu item
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // sesuai backend
};

// Function to fetch the menu list with proper error handling
const fetchMenuList = async (token: string | null) => {
  try {
    const response = await axios.get<MenuItem[]>("api/menus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Gagal memuat menu.");
  }
};

const MenuCard = ({
  item,
  onAddToCart,
  isItemInCart,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isItemInCart: boolean;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <p className="text-lg font-bold text-green-500 mt-2">
          Rp {item.price.toLocaleString()}
        </p>
        <button
          onClick={() => onAddToCart(item)}
          className={`mt-4 w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors ${isItemInCart ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFD93D] hover:bg-[#FFCC00]"}`}
          disabled={isItemInCart} // Disable if already in cart
        >
          {isItemInCart ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const { data, isLoading, error } = useQuery<MenuItem[], Error>({
    queryKey: ["menuList", restaurantId],
    queryFn: () => fetchMenuList(getToken()),
  });

  const handleAddToCart = async (item: MenuItem) => {
    const token = getToken();
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    try {
      // Cek apakah item sudah ada di keranjang
      if (cartItems.some((cartItem) => cartItem.id === item.id)) {
        alert("Item ini sudah ada di keranjang!");
        return;
      }

      const response = await axios.post(
        "/api/cart",
        {
          userId: 1, // Gantilah dengan userId yang sesuai, misalnya dari token
          menuId: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Jika berhasil, tambahkan item ke cartItems
      setCartItems((prev) => [...prev, item]);
      alert("Berhasil menambahkan ke keranjang!");
    } catch (error: any) {
      console.error("Gagal menambahkan ke keranjang:", error);
      alert("Gagal menambahkan ke keranjang.");
    }
  };

  if (isLoading) return <div className="text-center text-xl font-semibold text-blue-500">Memuat menu...</div>;

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Gagal memuat menu. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Menu Restoran #{restaurantId}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            isItemInCart={cartItems.some((cartItem: MenuItem) => cartItem.id === item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
