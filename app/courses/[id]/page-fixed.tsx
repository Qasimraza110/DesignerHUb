import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COURSES } from '../../src/constants';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const courseId = parseInt(params.id);
  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    notFound();
  }

  // Course-specific roadmap data
  const getRoadmap = (courseId: number) => {
    const roadmaps: { [key: number]: any[] } = {
      1: [ // Graphic Design Fundamentals
        {
          week: 1,
          title: 'Design Fundamentals',
          topics: ['Introduction to Graphic Design', 'Design Principles', 'Color Theory', 'Typography Basics']
        },
        {
          week: 2,
          title: 'Design Tools',
          topics: ['Adobe Photoshop Basics', 'Adobe Illustrator Basics', 'Workspace Setup', 'File Formats']
        },
        {
          week: 3,
          title: 'Composition & Layout',
          topics: ['Layout Principles', 'Grid Systems', 'Visual Hierarchy', 'Balance and Alignment']
        },
        {
          week: 4,
          title: 'Typography & Branding',
          topics: ['Advanced Typography', 'Brand Identity', 'Logo Design', 'Brand Guidelines']
        },
        {
          week: 5,
          title: 'Digital Design',
          topics: ['Web Graphics', 'Social Media Design', 'Print Design', 'Design for Different Mediums']
        },
        {
          week: 6,
          title: 'Projects & Portfolio',
          topics: ['Real-world Projects', 'Client Briefs', 'Revisions', 'Building Portfolio']
        },
        {
          week: 7,
          title: 'Industry Skills',
          topics: ['Design Trends', 'Freelancing', 'Client Communication', 'Final Assessment']
        },
        {
          week: 8,
          title: 'Career Development',
          topics: ['Job Search', 'Resume Building', 'Interview Preparation', 'Certification']
        }
      ],
      2: [ // UI/UX Design Mastery
        {
          week: 1,
          title: 'UI/UX Fundamentals',
          topics: ['What is UI/UX Design', 'Design Thinking Process', 'User-Centered Design', 'Design Psychology']
        },
        {
          week: 2,
          title: 'User Research',
          topics: ['User Research Methods', 'Creating Personas', 'User Journey Mapping', 'Competitive Analysis']
        },
        {
          week: 3,
          title: 'Information Architecture',
          topics: ['Site Mapping', 'Wireframing', 'User Flow Diagrams', 'Content Strategy']
        },
        {
          week: 4,
          title: 'UI Design Principles',
          topics: ['Visual Design Principles', 'Color in UI', 'Typography for Digital', 'Iconography']
        },
        {
          week: 5,
          title: 'Prototyping',
          topics: ['Low-fidelity Prototypes', 'High-fidelity Prototypes', 'Interactive Prototyping', 'Usability Testing']
        },
        {
          week: 6,
          title: 'Design Systems',
          topics: ['Creating Design Systems', 'Component Libraries', 'Style Guides', 'Design Tokens']
        },
        {
          week: 7,
          title: 'Advanced UX',
          topics: ['Accessibility', 'Mobile UX', 'Cross-platform Design', 'A/B Testing']
        },
        {
          week: 8,
          title: 'Tools & Workflow',
          topics: ['Figma Advanced', 'Sketch', 'InVision', 'Collaboration Tools']
        },
        {
          week: 9,
          title: 'Real Projects',
          topics: ['Complete App Design', 'Website Redesign', 'Client Project', 'Portfolio Case Study']
        },
        {
          week: 10,
          title: 'Professional Skills',
          topics: ['Presenting Design Work', 'Working with Developers', 'Career in UI/UX', 'Industry Trends']
        },
        {
          week: 11,
          title: 'Specialization',
          topics: ['Mobile App Design', 'Web Design', 'Product Design', 'UX Writing']
        },
        {
          week: 12,
          title: 'Final Project',
          topics: ['Capstone Project', 'Client Presentation', 'Final Review', 'Certification']
        }
      ],
      3: [ // Web Design Bootcamp
        {
          week: 1,
          title: 'HTML Fundamentals',
          topics: ['HTML Structure', 'Semantic HTML', 'Forms', 'Accessibility Basics']
        },
        {
          week: 2,
          title: 'CSS Fundamentals',
          topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'CSS Grid']
        },
        {
          week: 3,
          title: 'Responsive Design',
          topics: ['Media Queries', 'Mobile-First Design', 'Responsive Images', 'CSS Frameworks']
        },
        {
          week: 4,
          title: 'JavaScript Basics',
          topics: ['JS Fundamentals', 'DOM Manipulation', 'Events', 'ES6 Features']
        },
        {
          week: 5,
          title: 'Modern CSS',
          topics: ['CSS Variables', 'Animations', 'Transforms', 'Advanced Selectors']
        },
        {
          week: 6,
          title: 'JavaScript Advanced',
          topics: ['Async Programming', 'APIs', 'JSON', 'Error Handling']
        },
        {
          week: 7,
          title: 'Frameworks Introduction',
          topics: ['React Basics', 'Components', 'Props & State', 'React Hooks']
        },
        {
          week: 8,
          title: 'Building Projects',
          topics: ['Portfolio Website', 'Landing Pages', 'Interactive Components', 'Real Projects']
        },
        {
          week: 9,
          title: 'Backend Basics',
          topics: ['Node.js Introduction', 'Express.js', 'REST APIs', 'Database Basics']
        },
        {
          week: 10,
          title: 'Full-Stack Development',
          topics: ['MERN Stack', 'Authentication', 'Deployment', 'Version Control']
        }
      ],
      4: [ // Brand Identity Design
        {
          week: 1,
          title: 'Brand Strategy',
          topics: ['Brand Planning', 'Target Audience', 'Brand Positioning', 'Brand Values']
        },
        {
          week: 2,
          title: 'Research & Analysis',
          topics: ['Market Research', 'Competitor Analysis', 'Brand Audit', 'Brand Personality']
        },
        {
          week: 3,
          title: 'Logo Design',
          topics: ['Logo Concepts', 'Sketching', 'Digital Design', 'Logo Variations']
        },
        {
          week: 4,
          title: 'Brand Elements',
          topics: ['Color Palette', 'Typography', 'Imagery Style', 'Brand Patterns']
        },
        {
          week: 5,
          title: 'Brand Applications',
          topics: ['Business Cards', 'Letterheads', 'Packaging', 'Brand Collateral']
        },
        {
          week: 6,
          title: 'Digital Brand',
          topics: ['Website Design', 'Social Media Graphics', 'Email Templates', 'Digital Guidelines']
        }
      ],
      5: [ // Motion Graphics
        {
          week: 1,
          title: 'Animation Fundamentals',
          topics: ['Animation Principles', 'Timing & Spacing', 'Easing', 'Keyframe Animation']
        },
        {
          week: 2,
          title: 'After Effects Basics',
          topics: ['Interface', 'Compositions', 'Layers', 'Basic Effects']
        },
        {
          week: 3,
          title: 'Text Animation',
          topics: ['Text Layers', 'Text Animators', 'Advanced Text Effects', 'Kinetic Typography']
        },
        {
          week: 4,
          title: 'Shape Layers & Masks',
          topics: ['Shape Tools', 'Path Animation', 'Masking Techniques', 'Shape Effects']
        },
        {
          week: 5,
          title: 'Advanced Techniques',
          topics: ['Particle Effects', '3D Animation', 'Camera Movement', 'Lighting']
        },
        {
          week: 6,
          title: 'Character Animation',
          topics: ['Character Design', 'Rigging', 'Walk Cycles', 'Lip Sync']
        },
        {
          week: 7,
          title: 'Visual Effects',
          topics: ['Green Screen', 'Tracking', 'Color Correction', 'Compositing']
        },
        {
          week: 8,
          title: 'Sound & Music',
          topics: ['Audio Editing', 'Sound Design', 'Music Integration', 'Sync Techniques']
        },
        {
          week: 9,
          title: 'Project Work',
          topics: ['Logo Animations', 'Title Sequences', 'Social Media Videos', 'Commercial Spots']
        },
        {
          week: 10,
          title: 'Advanced Projects',
          topics: ['Explainer Videos', 'Product Demos', 'Brand Stories', 'Interactive Animations']
        },
        {
          week: 11,
          title: 'Workflow & Optimization',
          topics: ['Project Organization', 'Rendering', 'File Formats', 'Delivery Specs']
        },
        {
          week: 12,
          title: 'Industry Standards',
          topics: ['Client Requirements', 'Revisions', 'Feedback', 'Industry Trends']
        },
        {
          week: 13,
          title: 'Special Effects',
          topics: ['Advanced VFX', 'Motion Tracking', 'Element Integration', 'Complex Composites']
        },
        {
          week: 14,
          title: 'Final Portfolio',
          topics: ['Showreel Creation', 'Portfolio Website', 'Client Presentations', 'Career Development']
        }
      ],
      6: [ // 3D Design Essentials
        {
          week: 1,
          title: '3D Fundamentals',
          topics: ['3D Concepts', 'Software Overview', 'Interface Navigation', 'Basic Modeling']
        },
        {
          week: 2,
          title: 'Modeling Techniques',
          topics: ['Polygon Modeling', 'Edge Modeling', 'Subdivision Surfaces', 'NURBS']
        },
        {
          week: 3,
          title: 'Texturing',
          topics: ['UV Mapping', 'Texture Creation', 'Material Properties', 'PBR Materials']
        },
        {
          week: 4,
          title: 'Lighting',
          topics: ['Light Types', 'Lighting Setup', 'HDRI Lighting', 'Global Illumination']
        },
        {
          week: 5,
          title: 'Rendering',
          topics: ['Render Engines', 'Render Settings', 'Post-Processing', 'Optimization']
        },
        {
          week: 6,
          title: 'Animation',
          topics: ['Keyframe Animation', 'Character Animation', 'Camera Animation', 'Particle Systems']
        },
        {
          week: 7,
          title: 'Advanced Modeling',
          topics: ['Organic Modeling', 'Hard Surface Modeling', 'Retopology', 'UV Unwrapping']
        },
        {
          week: 8,
          title: 'Shaders & Materials',
          topics: ['Shader Networks', 'Procedural Materials', 'Displacement', 'Transparency']
        },
        {
          week: 9,
          title: 'Dynamics & Simulation',
          topics: ['Cloth Simulation', 'Rigid Body Dynamics', 'Soft Body', 'Fluid Simulation']
        },
        {
          week: 10,
          title: 'Compositing',
          topics: ['Multi-Pass Rendering', 'Layer Compositing', 'Color Correction', 'Effects']
        },
        {
          week: 11,
          title: 'Product Visualization',
          topics: ['Product Modeling', 'Material Setup', 'Lighting for Products', 'Turntable Animation']
        },
        {
          week: 12,
          title: 'Architectural Visualization',
          topics: ['Building Modeling', 'Interior Design', 'Exterior Rendering', 'Walkthroughs']
        },
        {
          week: 13,
          title: 'Character Design',
          topics: ['Character Modeling', 'Rigging', 'Texturing Characters', 'Animation']
        },
        {
          week: 14,
          title: 'Game Assets',
          topics: ['Low-Poly Modeling', 'Game Textures', 'LOD Creation', 'Optimization']
        },
        {
          week: 15,
          title: 'Advanced Techniques',
          topics: ['Scripting', 'Custom Tools', 'Pipeline Development', 'Team Collaboration']
        },
        {
          week: 16,
          title: 'Portfolio & Career',
          topics: ['Creating Portfolio', 'Demo Reel', 'Job Applications', 'Industry Networking']
        }
      ]
    };

    return roadmaps[courseId] || roadmaps[1]; // Default to graphic design roadmap
  };

  const roadmap = getRoadmap(courseId);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">Course Image</span>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.level}
              </span>
              <span className="text-3xl font-bold text-blue-600">{course.price}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button className="px-6 py-4 text-blue-600 border-b-2 border-blue-600 font-medium">
                Course Roadmap
              </button>
              <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
                Curriculum
              </button>
              <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
                Reviews
              </button>
            </nav>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Roadmap</h2>
            <div className="space-y-6">
              {roadmap.map((week, index) => (
                <div key={week.week} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {week.week}
                    </div>
                    {index < roadmap.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Week {week.week}: {week.title}
                    </h3>
                    <ul className="space-y-1">
                      {week.topics.map((topic: string, topicIndex: number) => (
                        <li key={topicIndex} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <Link
            href={`/payment?course=${encodeURIComponent(course.title)}`}
            className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Enroll Now - {course.price}
          </Link>
          <Link
            href="/courses"
            className="bg-gray-200 text-gray-700 text-center py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}