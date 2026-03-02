import Image from "next/image";
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
            Empowering Future <span className="text-indigo-600">IT Professionals</span> in Just 3 Months
          </h1>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Designer’s Hub is a career-focused IT training institute built for
            students who don’t just want certificates… they want skills,
            confidence, and real-world opportunities. We specialize in practical,
            market-aligned courses designed to transform beginners into job-ready
            professionals within three months.
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
              To Bridge Learning & Industry
            </h2>

            <p className="text-gray-600 mb-6">
              To bridge the gap between traditional learning and industry demand,
              we provide hands-on IT education that prepares students for
              freelancing, internships, and professional careers. Education should
              not stop at theory—it should build portfolios, confidence, and
              earning potential.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Market-aligned curriculum</li>
              <li>✔ Portfolio development</li>
              <li>✔ Internship opportunities</li>
              <li>✔ Practical learning environment</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/skills.jpg"
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

        {/* ===== WHAT MAKES US DIFFERENT ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            What Makes Us Different
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            Why Choose Designer's Hub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
            {
              title: "Market-Aligned Curriculum",
              desc: "Our course outlines follow current industry trends. Students learn what the market actually requires.",
            },
            {
              title: "Portfolio Development",
              desc: "Work on real projects to create a professional portfolio ready to showcase to clients or employers.",
            },
            {
              title: "Internship Opportunities",
              desc: "Top-performing students get internship opportunities to gain real work experience.",
            },
            {
              title: "Practical Learning Environment",
              desc: "Hands-on training, project-based tasks, and mentorship to apply skills in real scenarios.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold rounded-full">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== PROGRAMS ===== */}
        {/* <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Our Programs
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            Intensive 3-Month Programs
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We currently offer intensive 3-month programs in:
          </p>

          <ul className="mt-6 space-y-2 text-gray-600">
            <li>• Graphic Designing</li>
            <li>• Freelancing</li>
            <li>• App Development</li>
          </ul>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Each course is designed to build technical expertise along with professional confidence.
          </p>
        </div> */}

        {/* ===== VISION ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Our Vision
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            Shaping Competent IT Professionals
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            To become a leading IT skill development institute that produces competent,
            creative, and industry-ready professionals who can compete in the digital marketplace.
          </p>
        </div>

        {/* ===== WHO WE SERVE ===== */}
        {/* <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Who We Serve
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            Students, Beginners, and Freelancers
          </h2>

          <ul className="mt-6 space-y-2 text-gray-600">
            <li>• Students who want career-oriented IT skills</li>
            <li>• Individuals interested in freelancing</li>
            <li>• Beginners looking to start a tech career</li>
            <li>• Creative minds who want structured guidance</li>
          </ul>
        </div> */}

        {/* ===== JOIN THE JOURNEY ===== */}
        <div className="text-center mb-20">
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-1 rounded-full">
            Join the Journey
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-6">
            We Build Skills, Portfolios & Careers
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            At Designer’s Hub, we don’t just teach software. We build skills. We
            build portfolios. We build careers. If you're ready to turn your
            potential into professional ability, your journey starts here.
          </p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
  {[
    {
      name: "Syed Muhammad Ali",
      role: "Founder & CEO",
      img: "/ali.jpeg",
    },
    {
      name: "Qasim Raza",
      role: "CTO & Junior Software Engineer",
      img: "/qasim.jpeg",
    },
  ].map((member, index) => (
    <div key={index} className="text-center">
      {/* Fixed size image */}
      <div className="w-[250px] h-[250px] mx-auto mb-4 rounded-xl overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          width={250}
          height={250}
          className="object-cover"
        />
      </div>

      <h3 className="font-semibold text-gray-900">{member.name}</h3>
      <p className="text-indigo-600 text-sm">{member.role}</p>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
