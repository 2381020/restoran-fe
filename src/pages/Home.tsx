import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      {/* Search Bar without icon */}
      <div className="w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Cari restoran atau makanan..."
        />
      </div>

      {/* Welcome Banner Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di FoodEase!</h2>
        <p className="text-gray-600">Temukan makanan favoritmu & nikmati promo menarik!</p>
      </div>

      {/* Restaurant Recommendations Section */}
      <div className="w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Rekomendasi Restoran</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <h4 className="font-bold text-lg text-gray-800">Restoran #{item}</h4>
              <p className="text-gray-600 mb-2">Makanan Lezat & Harga Terjangkau</p>
              <Link
                to={`/menu/${item}`}
                className="inline-block bg-[#FFD93D] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#FFCC00]"
              >
                Lihat Menu
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="w-full max-w-2xl text-center bg-yellow-100 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">Promo Hari Ini</h3>
        <p className="text-lg font-medium text-yellow-700">Diskon 50% untuk pemesanan pertama!</p>
      </div>
    </div>
  );
};

export default Home;
