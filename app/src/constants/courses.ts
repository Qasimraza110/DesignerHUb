export interface Course {
  id: number;
  title: string;
  duration: string;
  price: string; // in PKR
  image: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  roadmap: {
    week: number;
    title: string;
    topics: string[];
  }[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Graphic Designing',
    duration: '3 months',
    price: '8000 PKR',
    image: '/course1.jfif',
    description: 'Learn the basics of graphic design including color theory, typography, and composition.',
    level: 'Beginner',
    roadmap: [
      { week: 1, title: 'Design Fundamentals', topics: ['Color Theory', 'Typography', 'Composition'] },
      { week: 2, title: 'Tools & Software', topics: ['Adobe Photoshop', 'Illustrator Basics', 'Design Resources'] },
      { week: 3, title: 'Projects & Portfolio', topics: ['Real-World Projects', 'Portfolio Building', 'Career Tips'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Design Trends', 'Advanced Software Techniques', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Design Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Design Mastery', topics: ['Scaling Design Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Design Trends', 'Advanced Software Techniques', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End Design Project', 'Portfolio Integration', 'Final Presentation'] } 
    ]
  },
  {
    id: 2,
    title: 'Freelancing',
    duration: '3 months',
    price: '4000 PKR',
    image: '/course2.jfif',
    description: 'Learn how to start freelancing, get clients, and manage projects professionally.',
    level: 'Beginner',
    roadmap: [
      { week: 1, title: 'Freelancing Basics', topics: ['Introduction', 'Platforms Overview', 'Profile Setup'] },
      { week: 2, title: 'Finding Clients', topics: ['Bidding', 'Proposals', 'Client Communication'] },
      { week: 3, title: 'Project Management', topics: ['Managing Projects', 'Deliverables', 'Portfolio Creation'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Freelancing Trends', 'Advanced Client Acquisition', 'Industry Insights'] }, 
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Freelance Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 9, title: 'Bonus Content', topics: ['Emerging Freelancing Trends', 'Advanced Client Acquisition', 'Industry Insights'] },
      { week: 10, title: 'Capstone Project', topics: ['End-to-End Freelance Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 11, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 12, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] }


    ]
  },
  {
    id: 3,
    title: 'Video Editing',
    duration: '3 months',
    price: '10000 PKR',
    image: '/course3.jfif',
    description: 'Master video editing with professional tools and real-world projects.',
    level: 'Intermediate',
    roadmap: [
      { week: 1, title: 'Editing Basics', topics: ['Software Overview', 'Cutting & Trimming', 'Transitions'] },
      { week: 2, title: 'Effects & Audio', topics: ['Effects', 'Sound Editing', 'Color Correction'] },
      { week: 3, title: 'Projects', topics: ['Short Videos', 'Social Media Projects', 'Portfolio Project'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Video Trends', 'Advanced Editing Techniques', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Video Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Video Editing Mastery', topics: ['Scaling Editing Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },

      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Video Trends', 'Advanced Editing Techniques', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End Video Project', 'Portfolio Integration', 'Final Presentation'] }

    ]
  },
  {
    id: 4,
    title: 'MS Office',
    duration: '3 months',
    price: '3000 PKR',
    image: '/course4.jfif',
    description: 'Learn MS Word, Excel, PowerPoint, and Outlook for professional use.',
    level: 'Beginner',
    roadmap: [
      { week: 1, title: 'Word & PowerPoint', topics: ['Document Creation', 'Presentations', 'Formatting'] },
      { week: 2, title: 'Excel', topics: ['Formulas', 'Charts', 'Data Analysis'] },
      { week: 3, title: 'Outlook & Projects', topics: ['Email Management', 'Calendar', 'Final Assignment'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Office Trends', 'Advanced Features', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Office Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Office Mastery', topics: ['Scaling Office Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Office Trends', 'Advanced Features', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End Office Project', 'Portfolio Integration', 'Final Presentation'] }

    ]
  },
  {
    id: 5,
    title: 'Web Development',
    duration: '3 months',
    price: '12000 PKR',
    image: '/course5.jfif',
    description: 'Full-stack web development course covering HTML, CSS, JavaScript, and frameworks.',
    level: 'Intermediate',
    roadmap: [
      { week: 1, title: 'HTML & CSS', topics: ['HTML Basics', 'CSS Styling', 'Responsive Design'] },
      { week: 2, title: 'JavaScript Basics', topics: ['Variables', 'DOM Manipulation', 'Events'] },
      { week: 3, title: 'Frameworks & Projects', topics: ['React Basics', 'Mini Project', 'Final Project'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Web Trends', 'Advanced Frameworks', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Web Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Web Development Mastery', topics: ['Scaling Web Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Web Trends', 'Advanced Frameworks', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End Web Project', 'Portfolio Integration', 'Final Presentation'] }

    ]
  },
  {
    id: 6,
    title: 'App Development',
    duration: '3 months',
    price: '12000 PKR',
    image: '/course6.jfif',
    description: 'Learn mobile app development for Android and iOS using modern frameworks.',
    level: 'Intermediate',
    roadmap: [
      { week: 1, title: 'Mobile Basics', topics: ['Platform Overview', 'UI Components', 'Navigation'] },
      { week: 2, title: 'App Logic', topics: ['State Management', 'API Integration', 'User Input'] },
      { week: 3, title: 'Final App Project', topics: ['Building App', 'Testing', 'Deployment'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Mobile Trends', 'Advanced Frameworks', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End App Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'App Development Mastery', topics: ['Scaling App Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Mobile Trends', 'Advanced Frameworks', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End App Project', 'Portfolio Integration', 'Final Presentation'] },

      
    ]
  },
  {
    id: 7,
    title: 'UI/UX',
    duration: '3 months',
    price: '15000 PKR',
    image: '/course7.jfif',
    description: 'Master UI/UX design principles and create user-friendly designs.',
    level: 'Advanced',
    roadmap: [
      { week: 1, title: 'UI/UX Fundamentals', topics: ['Design Principles', 'User Research', 'Wireframes'] },
      { week: 2, title: 'Prototyping', topics: ['Low & High-Fidelity', 'User Testing', 'Feedback'] },
      { week: 3, title: 'Final Project', topics: ['Complete UI/UX Design', 'Portfolio Presentation'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging UI/UX Trends', 'Advanced Design Techniques', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End UI/UX Project', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'UI/UX Mastery', topics: ['Scaling Design Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging UI/UX Trends', 'Advanced Design Techniques', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End UI/UX Project', 'Portfolio Integration', 'Final Presentation'] }
      
    ]
  },
  {
    id: 8,
    title: 'Digital Marketing',
    duration: '3 months',
    price: '7000 PKR',
    image: '/course8.jfif',
    description: 'Learn SEO, social media marketing, Google Ads, and email marketing.',
    level: 'Beginner',
    roadmap: [
      { week: 1, title: 'Marketing Basics', topics: ['SEO', 'Content Marketing', 'Email Campaigns'] },
      { week: 2, title: 'Social Media', topics: ['Facebook Ads', 'Instagram Marketing', 'Analytics'] },
      { week: 3, title: 'Projects', topics: ['Campaign Setup', 'Report Generation', 'Final Assignment'] },
      { week: 4, title: 'Bonus Content', topics: ['Emerging Marketing Trends', 'Advanced Strategies', 'Industry Insights'] },
      { week: 5, title: 'Capstone Project', topics: ['End-to-End Marketing Campaign', 'Portfolio Integration', 'Final Presentation'] },
      { week: 6, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 7, title: 'Marketing Mastery', topics: ['Scaling Marketing Skills', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 8, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },

      { week: 9, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 10, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      { week: 11, title: 'Bonus Content', topics: ['Emerging Marketing Trends', 'Advanced Strategies', 'Industry Insights'] },
      { week: 12, title: 'Capstone Project', topics: ['End-to-End Marketing Campaign', 'Portfolio Integration', 'Final Presentation'] }
    ]
  },
  {
    id: 9,
    title: 'E-Commerce',
    duration: '3 months',
    price: '7000 PKR',
    image: '/course9.jfif',
    description: 'Learn to build online stores, manage products, and run e-commerce campaigns.',
    level: 'Intermediate',
    roadmap: [
      { week: 1, title: 'E-Commerce Basics', topics: ['Platform Setup', 'Product Listing', 'Payment Integration'] },
      { week: 2, title: 'Store Management', topics: ['Orders', 'Shipping', 'Analytics'] },
      { week: 3, title: 'Projects', topics: ['Launch Store', 'Marketing Plan', 'Final Project'] },
      { week: 4, title: 'Advanced E-Commerce', topics: ['Dropshipping', 'Multi-Channel Selling', 'Scaling'] },
      { week: 5, title: 'Real-World Projects', topics: ['Live Store Management', 'Customer Interaction', 'Project Delivery'] },
      { week: 6, title: 'Final Showcase', topics: ['Store Presentation', 'Marketing Results', 'Career Opportunities'] },
      { week: 7, title: 'Bonus Content', topics: ['Emerging E-Commerce Trends', 'Advanced Marketing Techniques', 'Industry Insights'] },
      { week: 8, title: 'Capstone Project', topics: ['End-to-End Store Setup', 'Marketing Campaign', 'Final Presentation'] },
      { week: 9, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 10, title: 'E-Commerce Mastery', topics: ['Scaling Business', 'Building a Personal Brand', 'Long-Term Success'] },
      { week: 11, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 12, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] }
    ]
  },
  {
    id: 10,
    title: 'Freelance Graphic Design',
    duration: '3 months',
    price: '8000 PKR',
    image: '/course10.jfif',
    description: 'Advanced graphic design for freelancers including real projects and portfolio building.',
    level: 'Advanced',
    roadmap: [
      { week: 1, title: 'Advanced Design', topics: ['Logo Design', 'Branding', 'Typography'] },
      { week: 2, title: 'Client Work', topics: ['Client Briefs', 'Revisions', 'Feedback'] },
      { week: 3, title: 'Portfolio', topics: ['Showreel Creation', 'Portfolio Website', 'Final Project'] },
      { week: 4, title: 'Freelancing Skills', topics: ['Time Management', 'Pricing Strategies', 'Client Communication'] },
      { week: 5, title: 'Real Projects', topics: ['Live Project Work', 'Client Interaction', 'Project Delivery'] },
      { week: 6, title: 'Final Portfolio', topics: ['Refining Portfolio', 'Showcasing Work', 'Career Planning'] },
      { week: 7, title: 'Freelancing Success', topics: ['Building Reputation', 'Scaling Freelance Business', 'Long-Term Success'] },
      { week: 8, title: 'Final Showcase', topics: ['Portfolio Presentation', 'Networking', 'Career Opportunities'] },
      {
        week: 9,
        title: 'Bonus Content',
        topics: ['Emerging Design Trends', 'Advanced Software Techniques', 'Industry Insights'] 

      },
      {
        week: 10,
        title: 'Capstone Project',
        topics: ['End-to-End Project', 'Portfolio Integration', 'Final Presentation']
      },
      {week: 11, title: 'Career Development', topics: ['Resume Building', 'Interview Preparation', 'Job Search Strategies'] },
      { week: 12, title: 'Freelancing Mastery', topics: ['Scaling Freelance Business', 'Building a Personal Brand', 'Long-Term Success'] }
    ]
  }
];