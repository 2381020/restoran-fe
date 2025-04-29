import { Link } from "react-router-dom";

const categories = ["Fast Food", "Tradisional", "Minuman", "Dessert"];

const RestaurantList = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Daftar Restoran</h2>

      <div className="flex mb-6">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Cari restoran berdasarkan nama atau lokasi..."
        />
        <button className="ml-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Cari
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {categories.map((kategori) => (
          <button
            key={kategori}
            className="px-6 py-2 bg-[#FFD93D] rounded-lg text-gray-700 hover:bg-[#FFCC00] focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h4 className="text-2xl font-semibold mb-3 text-gray-800">Restoran #{item}</h4>
            <p className="text-gray-600 mb-4">Alamat: Jalan Makan No.{item}</p>
            <Link
              to={`/menu/${item}`}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Lihat Menu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
