import { useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "User",
    email: "xxxx@gmail.com",
    profilePicture: "https://i.pinimg.com/736x/33/ba/c0/33bac083ba44f180c1435fc41975bf36.jpg", // Example placeholder image
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Ideally, upload the file to the backend here, for now, just preview
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePicture: imageUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Profil</h2>
      
      {/* Profile Picture Section */}
      <div className="mt-6 text-center">
          <div className="mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
          <label
            htmlFor="profilePicture"
            className="cursor-pointer text-sm font-medium text-[#c29b02] hover:text-[#c29b02]"
          >
            Ganti Foto Profil
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-100 text-gray-500"
            disabled
          />
        </div>

        
      </form>
    </div>
  );
};

export default UserProfile;
