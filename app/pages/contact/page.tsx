"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error when typing
  };

  const validateForm = () => {
    let tempErrors: typeof errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      tempErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Contact Us
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
            Get In <span className="text-indigo-600">Touch</span>
          </h1>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Have questions about our courses or want to learn more? We're here
            to help you start your design journey.
          </p>
        </div>

        {/* ===== TOP INFO CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: MapPin,
              title: "Visit Us",
              text: "Gulshan Ravi Lahore",
            },
            {
              icon: Mail,
              title: "Email Us",
              text: "designerhubcourses@gmail.com",
            },
            {
              icon: Clock,
              title: "Working Hours",
              text: "Mon - Fri: 9AM - 6PM\nSat: 10AM - 4PM",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* ===== FORM + RIGHT SIDE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT FORM */}
          <div className="bg-white text-black rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Send size={18} /> Send Us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500 text-red-600"
                        : "border-gray-200 focus:ring-indigo-500 text-gray-900"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500 text-red-600"
                        : "border-gray-200 focus:ring-indigo-500 text-gray-900"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-500 text-red-600"
                      : "border-gray-200 focus:ring-indigo-500 text-gray-900"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500 text-red-600"
                      : "border-gray-200 focus:ring-indigo-500 text-gray-900"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* MAP */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Lahore&output=embed"
                width="100%"
                height="250"
                loading="lazy"
              ></iframe>
            </div>

            {/* FOLLOW US */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>

              <div className="flex gap-4 text-gray-500">
                <Facebook className=" hover:text-indigo-600" />
                <Instagram className="hover:text-indigo-600" />
                <Linkedin className="hover:text-indigo-600" />
              </div>
            </div>

            {/* QUICK ANSWERS */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Answers
              </h3>

              <div className="space-y-4 text-sm text-gray-500">
                <div>
                  <p className="font-medium text-gray-700">
                    How do I enroll in a course?
                  </p>
                  <p>
                    Browse courses, select your choice, and complete payment to
                    register.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-700">
                    What payment methods are accepted?
                  </p>
                  <p>
                    We accept Bank Transfer, JazzCash
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
