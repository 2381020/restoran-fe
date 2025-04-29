import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#333333]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-[#333333] p-6">
        <div className="flex items-center justify-center mb-8">
          <img
            alt="FoodEase Logo"
            src="https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-cutlery-bowl-logo-free-png-image_6682912.png"
            className="h-12 w-auto"
          />
          <span className="text-white text-xl font-semibold ml-2">FoodEase</span>
        </div>
        <div className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <NavLink
              to={item.to}
              key={item.name}
              className={({ isActive }) =>
                classNames(
                  isActive ? "bg-[#FFD93D] text-[#333333]" : "text-white hover:bg-[#444444]",
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => logout()}
          className="flex items-center space-x-2 text-white hover:bg-[#444444] rounded-md px-4 py-2 text-sm font-medium mt-8"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </div>

      {/* Mobile Hamburger Icon only */}
      <div className="md:hidden fixed top-4 left-2 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white focus:outline-none"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-64 flex-col bg-[#333333] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      alt="FoodEase Logo"
                      src="https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-cutlery-bowl-logo-free-png-image_6682912.png"
                      className="h-8 w-auto"
                    />
                    <span className="text-white text-lg font-semibold ml-2">FoodEase</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-white focus:outline-none"
                  >
                    <XMarkIcon className="h-8 w-8" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <NavLink
                      to={item.to}
                      key={item.name}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? "bg-[#FFD93D] text-[#333333]" : "text-white hover:bg-[#444444]",
                          "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                <button
                  onClick={() => {
                    logout();
                    setSidebarOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white hover:bg-[#444444] rounded-md px-4 py-2 text-sm font-medium mt-6"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Sign out</span>
                </button>
              </Dialog.Panel>
            </Transition.Child>

            <div className="w-0 flex-1" onClick={() => setSidebarOpen(false)}></div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Main content */}
      </div>
    </div>
  );
};

export default Navbar;
