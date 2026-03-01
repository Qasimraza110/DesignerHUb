"use client";

import Link from "next/link";
import { SITE_CONFIG, NAVIGATION_LINKS } from "../constants";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#6366f1,_transparent_40%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2">
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
                <span className="h-8 w-[2px] bg-white rounded-full"></span>

                <div
                  className="flex flex-col leading-tight
               text-2xl font-bold tracking-tight text-white
               group-hover:text-indigo-600 transition-colors duration-300"
                >
                  <span className="text-white">Designer’s</span>
                  <span className="text-white">Hub</span>
                </div>
              </div>
            </Link>

            <p className="text-neutral-400 max-w-md leading-relaxed mb-6">
              {SITE_CONFIG.description}. Join thousands of students mastering
              design skills from industry experts.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: <FaInstagram />, link: "https://www.instagram.com/designershub512?igsh=MWZ2ZTU0cmFvOWZnNg==" },
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/syed-muhammad-ali-jaffery-a09b7227a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61550882646664" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="w-10 h-10 flex items-center justify-center 
                             rounded-full bg-neutral-800 
                             hover:bg-indigo-600 
                             transition-all duration-300 
                             hover:scale-110 shadow-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-neutral-400 text-sm leading-relaxed">
              <p>{SITE_CONFIG.email}</p>
              <p>{SITE_CONFIG.phone}</p>
              <p>{SITE_CONFIG.address}</p>
            </div>
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="mt-16 border-t border-neutral-800 pt-10">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
            <p className="text-neutral-400 mb-6">
              Get latest course updates and design tips
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-neutral-800 
                           border border-neutral-700 
                           placeholder-neutral-500 
                           focus:outline-none focus:ring-2 
                           focus:ring-indigo-500 text-white"
              />
              <button
                className="px-8 py-3 rounded-full 
                           bg-gradient-to-r from-indigo-600 to-purple-600 
                           hover:from-indigo-700 hover:to-purple-700
                           transition-all duration-300 
                           shadow-lg hover:shadow-indigo-500/30"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 border-t border-neutral-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
            <p>&copy; 2024 {SITE_CONFIG.name}. All rights reserved.</p>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-indigo-400 transition"
              >
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-indigo-400 transition">
                Terms
              </Link>
              <Link
                href="/cookies"
                className="hover:text-indigo-400 transition"
              >
                Cookies
              </Link>
            </div>
          </div>

          <p className="mt-4 text-neutral-600 text-xs">{SITE_CONFIG.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
