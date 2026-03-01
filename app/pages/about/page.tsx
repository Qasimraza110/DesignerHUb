import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, Award, Target } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            About Us
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
            Empowering Future <span className="text-indigo-600">Designers</span>
          </h1>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Designer’s Hub is an elite online institute offering specialized
            short computer courses. We prioritize commitment and quality to help
            you achieve your career goals.
          </p>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            {
              icon: Users,
              number: "2,000+",
              label: "Students Enrolled",
            },
            {
              icon: BookOpen,
              number: "10+",
              label: "Courses Offered",
            },
            {
              icon: Award,
              number: "20+",
              label: "Expert Instructors",
            },
            {
              icon: Target,
              number: "98%",
              label: "Success Rate",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>

                <div className="text-2xl font-bold text-gray-900">
                  {stat.number}
                </div>

                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* ===== MISSION SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left */}
          <div>
            <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
              Our Mission
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
              Where Skill Meets Opportunity
            </h2>

            <p className="text-gray-600 mb-6">
              Our mission is to bridge the gap between aspiring designers and
              industry demands. We provide hands-on, practical training that
              prepares students for real-world challenges.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Industry-relevant curriculum</li>
              <li>✔ Hands-on project experience</li>
              <li>✔ Career guidance & placement</li>
              <li>✔ Lifetime learning access</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/skills.jfif"
              alt="Team Working"
              width={600}
              height={400}
              className="rounded-2xl shadow-md object-cover"
            />

            <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow">
              ⭐ 4.9/5 Rating
            </div>
          </div>
        </div>

        {/* ===== VALUES SECTION ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Our Values
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
            "Quality Education",
            "Student Success",
            "Innovation",
            "Community",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold rounded-full">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">
                We continuously strive to deliver the highest standards in
                learning.
              </p>
            </div>
          ))}
        </div>

        {/* ===== LEADERSHIP ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Our Team
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            Meet The Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
  {[{ name: "Syed Muhammad Ali", role: "Founder & CEO", img: "/ali.jpeg" }].map(
    (member, index) => (
      <div key={index} className="text-center">
        <Image
          src={member.img}
          alt={member.name}
          width={250}
          height={250}
          className="rounded-xl mx-auto mb-4 object-cover"
        />
        <h3 className="font-semibold text-gray-900">{member.name}</h3>
        <p className="text-indigo-600 text-sm">{member.role}</p>
      </div>
    ),
  )}
</div>
      </div>
    </div>
  );
}
