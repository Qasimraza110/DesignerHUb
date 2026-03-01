"use client";

import Link from "next/link";
import CourseCard from "./src/components/CourseCard";
import { Button } from "./src/components/ui/Button";
import { Card, CardContent } from "./src/components/ui/Card";
import { FEATURES, TESTIMONIALS, HOW_IT_WORKS } from "./src/constants";
import { COURSES } from "./src/constants/courses";
import {
  ArrowRight,
  Play,
  Users,
  BookOpen,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const featuredCourses = COURSES.slice(0, 6);

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

/* ===== STAT COMPONENT ===== */
function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="font-bold text-lg text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex bg-yellow-400 text-xs font-semibold px-4 py-1 rounded-full mb-6">
              ✨ Elite Online Institute
            </span>

            <h1 className="text-[44px] lg:text-[64px] font-extrabold leading-[1.15] text-gray-900">
              Where <span className="text-indigo-600">Skill</span>
              <br />
              Meets Opportunity
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-xl">
              Specialized short computer courses taught by industry experts.
              Transform your passion into profession with our commitment-first
              approach.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/courses">
                <Button size="lg" className="flex items-center gap-2">
                  Explore Courses <ArrowRight size={18} />
                </Button>
              </Link>

              {/* WhatsApp Watch Demo Button */}
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() =>
                  window.open(
                    "https://wa.me/923276315315?text=Hello!%20I%20want%20to%20get%20information%20about%20the%20course%20offerings%20at%20Designer's%20Hub.",
                    "_blank",
                  )
                }
              >
                <FaWhatsapp size={20} className="text-green-500" />
                WhatsApp Us
              </Button>
            </div>

            {/* STATS */}
            <div className="mt-14 flex gap-12 flex-wrap">
              <Stat icon={<Users />} value="1,500+" label="Students" />
              <Stat icon={<BookOpen />} value="10+" label="Courses" />
              <Stat icon={<BadgeCheck />} value="98%" label="Success Rate" />
            </div>
          </div>

          {/* RIGHT SIDE PREMIUM CARD */}
          <div className="relative flex justify-center lg:justify-end mt-16 lg:mt-0">
            <div
              className="hidden sm:block absolute inset-0 translate-x-6 translate-y-6 
                  rounded-[32px] bg-gradient-to-br 
                  from-indigo-600 to-purple-600 
                  blur-2xl opacity-30"
            ></div>

            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-[480px]">
              {/* Main Card */}
              <div
                className="relative bg-white/90 backdrop-blur-xl 
                    rounded-3xl sm:rounded-[32px] 
                    p-6 sm:p-8 lg:p-10
                    shadow-[0_25px_70px_rgba(79,70,229,0.25)]"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 
             rounded-2xl 
             bg-gradient-to-br from-indigo-500 to-purple-600 
             flex items-center justify-center 
             text-white shadow-lg"
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3">
                  Start Learning Today
                </h3>

                <p className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
                  Select a course, make payment, and begin your journey
                </p>

                {/* Steps */}
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Browse & Select Course",
                    "Complete Payment",
                    "Register & Start Learning",
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 sm:gap-4 
                       bg-gray-100/80 
                       p-3 sm:p-4 
                       rounded-xl"
                    >
                      <span
                        className="w-8 h-8 sm:w-9 sm:h-9 
                             flex items-center justify-center 
                             bg-yellow-400 text-gray-900 
                             font-bold rounded-full text-sm"
                      >
                        {i + 1}
                      </span>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="relative sm:absolute 
                      mt-6 sm:mt-0
                      sm:-bottom-6 sm:left-6 
                      bg-white shadow-xl 
                      rounded-2xl 
                      px-4 sm:px-6 py-3 sm:py-4 
                      flex items-center gap-3 w-fit"
                >
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                      1,500+ Students
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Enrolled this year
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Courses Badge */}
              <div
                className="absolute 
                    top-0 right-0 
                    sm:-top-8 sm:-right-8
                    bg-yellow-400 text-gray-900 
                    px-4 sm:px-6 
                    py-3 sm:py-5 
                    rounded-xl sm:rounded-2xl 
                    shadow-xl text-center"
              >
                <p className="text-lg sm:text-2xl font-bold">10+</p>
                <p className="text-xs sm:text-sm">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full font-semibold">
              Popular Courses
            </span>
            <h2 className="text-4xl font-extrabold mt-4 text-gray-900">
              Explore Our <span className="text-indigo-600">Top Courses</span>
            </h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              Specialized short courses designed to transform your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View All Courses →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              A Unique Approach to{" "}
              <span className="text-indigo-600">Learning</span>
            </h2>
            <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
              We prioritize commitment and quality over volume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={i}
                  className="p-8 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                    <Icon size={26} />
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {f.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-28 bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-4 py-1 rounded-full">
            How It Works
          </span>

          <h2 className="text-4xl font-extrabold mt-6">
            Your Journey to <span className="text-yellow-400">Excellence</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} variant="glass" className="p-8 text-left">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black mb-4">
                    <Icon size={24} />
                  </div>

                  <h3 className="font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              );
            })}
          </div>

          <Button variant="yellow" size="xl" className="mt-14">
            Start Your Journey →
          </Button>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="p-8 rounded-3xl shadow-md">
                <CardContent>
                  <p className="italic text-gray-700 mb-6">"{t.content}"</p>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
