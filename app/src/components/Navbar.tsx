"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* ================= LOGO ================= */}
          <Link
            href="/"
            className="flex items-center gap-3 group whitespace-nowrap"
          >
            <img
              src="/designer.png"
              alt="Designer's Hub Logo"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />

            <div className="flex items-center gap-3">
              <span className="h-8 w-[2px] bg-black rounded-full"></span>

              <div
                className="flex flex-col leading-tight
               text-2xl font-bold tracking-tight text-gray-900
               group-hover:text-indigo-600 transition-colors duration-300"
              >
                <span>Designer’s</span>
                <span className="">Hub</span>
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Courses", "About", "Contact"].map((item, i) => {
              const links = ["/", "/courses", "/pages/about", "/pages/contact"];
              return (
                <Link
                  key={i}
                  href={links[i]}
                  className="relative text-neutral-700 font-medium transition
                             hover:text-indigo-600
                             after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0
                             after:bg-indigo-600
                             after:transition-all after:duration-300
                             hover:after:w-full"
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 bg-neutral-200 rounded-full animate-pulse"></div>
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-indigo-50 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </div>
                  {/* <FaUserCircle className="w-5 h-5 text-gray-600" /> */}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-neutral-200">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-indigo-600 font-medium px-3 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  Sign Up
                </Link>

                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full 
                             bg-indigo-600 text-white font-medium
                             shadow-md hover:shadow-lg
                             hover:bg-indigo-700
                             transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Courses", link: "/courses" },
                { name: "About", link: "/pages/about" },
                { name: "Contact", link: "/pages/contact" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-neutral-200 mt-2 pt-3 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>

                    <Link
                      href="/login"
                      className="block px-4 py-2 rounded-lg bg-indigo-600 text-white text-center hover:bg-indigo-700 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
