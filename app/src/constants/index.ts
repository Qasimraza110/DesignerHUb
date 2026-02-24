// Generic constants for the application

export const SITE_CONFIG = {
  name: "Designer's Hub",
  tagline: "Where Skill Meets Opportunity",
  description: "Learn design skills from industry experts",
  email: "contact@designershub.com",
  phone: "+1 (555) 123-4567",
  address: "123 Design Street, Creative City, CC 12345"
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'About', href: '/pages/about' },
  { name: 'Contact', href: '/pages/contact' },
  { name: 'Dashboard', href: '/dashboard' }
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' }
];

export const COURSES = [
  {
    id: 1,
    title: 'Graphic Design Fundamentals',
    duration: '8 weeks',
    price: '$299',
    image: '/course1.jpg',
    description: 'Learn the basics of graphic design including color theory, typography, and composition.',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'UI/UX Design Mastery',
    duration: '12 weeks',
    price: '$499',
    image: '/course2.jpg',
    description: 'Master user interface and user experience design principles.',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Web Design Bootcamp',
    duration: '10 weeks',
    price: '$399',
    image: '/course3.jpg',
    description: 'Complete web design course covering HTML, CSS, and modern frameworks.',
    level: 'Beginner'
  },
  {
    id: 4,
    title: 'Brand Identity Design',
    duration: '6 weeks',
    price: '$249',
    image: '/course4.jpg',
    description: 'Create compelling brand identities that resonate with your audience.',
    level: 'Intermediate'
  },
  {
    id: 5,
    title: 'Motion Graphics',
    duration: '14 weeks',
    price: '$599',
    image: '/course5.jpg',
    description: 'Learn to create stunning motion graphics and animations.',
    level: 'Advanced'
  },
  {
    id: 6,
    title: '3D Design Essentials',
    duration: '16 weeks',
    price: '$699',
    image: '/course6.jpg',
    description: 'Master 3D modeling and design for various applications.',
    level: 'Advanced'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Graphic Designer',
    company: 'Creative Agency',
    content: 'Designers Hub transformed my career. The courses are comprehensive and practical.',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'UI/UX Designer',
    company: 'Tech Startup',
    content: 'Excellent learning experience with real-world projects and expert instructors.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Brand Designer',
    company: 'Marketing Firm',
    content: 'The brand identity course gave me the skills I needed to excel in my field.',
    rating: 5
  }
];

export const FEATURES = [
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience.',
    icon: '👨‍🏫'
  },
  {
    title: 'Hands-on Projects',
    description: 'Apply your skills with real-world design projects.',
    icon: '💼'
  },
  {
    title: 'Flexible Learning',
    description: 'Study at your own pace with lifetime access to course materials.',
    icon: '⏰'
  },
  {
    title: 'Certificate',
    description: 'Earn recognized certificates upon course completion.',
    icon: '🏆'
  }
];