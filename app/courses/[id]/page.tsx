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

  // Mock roadmap data - in a real app, this would come from a database or API
  const roadmap = [
    {
      week: 1,
      title: 'Introduction and Fundamentals',
      topics: ['Course overview', 'Design principles', 'Color theory basics', 'Typography fundamentals']
    },
    {
      week: 2,
      title: 'Tools and Software',
      topics: ['Software installation', 'Interface navigation', 'Basic tools usage', 'File management']
    },
    {
      week: 3,
      title: 'Core Skills Development',
      topics: ['Composition techniques', 'Layout design', 'Visual hierarchy', 'Brand elements']
    },
    {
      week: 4,
      title: 'Advanced Techniques',
      topics: ['Advanced tools', 'Effects and filters', 'Professional workflows', 'Quality assurance']
    },
    {
      week: 5,
      title: 'Project Work',
      topics: ['Real-world projects', 'Client requirements', 'Revisions and feedback', 'Final delivery']
    },
    {
      week: 6,
      title: 'Portfolio and Career',
      topics: ['Building portfolio', 'Career guidance', 'Industry trends', 'Certification preparation']
    }
  ];

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
                      {week.topics.map((topic, topicIndex) => (
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