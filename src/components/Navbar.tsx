import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // ini yang benar

const navigation = [
  { name: "Home", to: "/", current: false },
  { name: "Restoran", to: "/restaurants", current: false },
  { name: "Keranjang", to: "/cart", current: false },
  { name: "Pesanan", to: "/orderhistory", current: false },
  { name: "Akun", to: "/profile", current: false },
  { name: "Bantuan", to: "/Help", current: false }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div className="flex h-screen bg-[#333333]">
      {/* Sidebar */}
      <div className="w-64 bg-[#333333] p-6">
        <div className="flex items-center justify-center mb-8">
          <img
            alt="FoodEase Logo"
            src="https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-cutlery-bowl-logo-free-png-image_6682912.png"
            className="h-12 w-auto"
          /><span className="text-white text-xl font-semibold">FoodEase</span>
        </div>
        <div className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <NavLink
              to={item.to}
              key={item.name}
              className={({ isActive }) =>
                classNames(
                  isActive ? "bg-[#FFD93D] text-[#333333]" : "text-white hover:bg-[#444444] hover:text-white",
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Logout icon button */}
        <Menu as="div" className="relative mt-8">
          <div>
            <MenuButton className="relative flex rounded-full bg-[#333333] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#333333]">
              <span className="sr-only">Open logout menu</span>
              <ArrowRightOnRectangleIcon className="w-10 h-10 text-white" />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition-all duration-200"
          >
            <MenuItem>
              <a
                onClick={() => logout()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                Sign out
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* Content area */}
      <div className="flex-1 p-6">
        {/* Place your main content here */}
      </div>
    </div>
  );
};

export default Navbar;
