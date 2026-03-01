"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../constants/sidebar";
import { FiUser } from "react-icons/fi";

interface SidebarProps {
  items: SidebarItem[];
  enrolledCourses?: number;
  pendingPayments?: number;
  completedCourses?: number;
  className?: string;
}

const Sidebar = React.memo(function Sidebar({
  items,
  enrolledCourses = 0,
  pendingPayments = 0,
  completedCourses = 0,
  className = "",
}: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
     
      <button
        onClick={() => setOpen(true)}
        className=" md:hidden fixed top-15 left-1 z-50 bg-black text-yellow-400 p-2 rounded-lg shadow-lg"
      >
        ☰
      </button>

   
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-[280px]
          bg-gradient-to-b from-black to-gray-900 text-white
          shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${className}
        `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FiUser className="text-yellow-400 text-xl" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">Student Panel</h2>
          </div>

          <ul className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-yellow-400" />
                    )}

                    <Icon
                      className={`text-lg ${
                        isActive
                          ? "text-yellow-400"
                          : "text-gray-400 group-hover:text-yellow-400"
                      }`}
                    />
                    <span className="font-medium tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

         
          <div className="my-8 border-t border-gray-700" />

     
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">
              Quick Stats
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Enrolled Courses</span>
                <span className="font-semibold text-white">
                  {enrolledCourses}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Pending Payments</span>
                <span className="font-semibold text-yellow-400">
                  {pendingPayments}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Completed</span>
                <span className="font-semibold text-green-400">
                  {completedCourses}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
