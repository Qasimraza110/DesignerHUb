import { FiHome, FiClock, FiMap } from "react-icons/fi";

export interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export const STUDENT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiHome,
    href: "/dashboard",
  },
  {
    id: "courses",
    label: "My Courses",
    icon: FiHome,
    href: "/dashboard/enrolledcourses",
  },
  {
    id: "timetable",
    label: "Timetable",
    icon: FiClock,
    href: "/dashboard/timetable",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: FiMap,
    href: "/dashboard/roadmap",
  },
];