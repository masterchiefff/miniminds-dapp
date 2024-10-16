import { Book, Clock, Award, Star, User, Play, CheckCircle, ChevronRight } from 'lucide-react'

export default function CourseDetails() {
  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      <div className="w-16 bg-yellow-400 flex flex-col items-center py-4 space-y-8">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Book className="text-yellow-400" />
        </div>
        {['home', 'book', 'star', 'award'].map((icon, index) => (
          <div key={index} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 cursor-pointer">
            {icon === 'book' ? (
              <Book className="text-white" />
            ) : icon === 'star' ? (
              <Star className="text-white" />
            ) : icon === 'award' ? (
              <Award className="text-white" />
            ) : (
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Introduction to Algebra</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <Book className="w-5 h-5" />
              Math
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              4 weeks
            </span>
            <span className="flex items-center gap-1">
              <User className="w-5 h-5" />
              Beginner
            </span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-gray-300 fill-current" />
              <span className="ml-1">(4.2)</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Overview</h2>
            <p className="text-gray-700 mb-4">
              This course provides a comprehensive introduction to algebra, covering fundamental concepts and problem-solving techniques. 
              You'll learn about variables, equations, functions, and graphs, building a strong foundation for more advanced mathematical studies.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <Play className="w-5 h-5" />
                Start Learning
              </button>
              <div className="bg-yellow-100 rounded-full px-4 py-2 flex items-center">
                <span className="font-bold text-yellow-700 mr-2">Earn 100</span>
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">What You'll Learn</h2>
            <ul className="grid grid-cols-2 gap-4">
              {[
                "Understand variables and constants",
                "Solve linear equations and inequalities",
                "Graph linear functions",
                "Perform operations with polynomials",
                "Factorize algebraic expressions",
                "Apply algebra to real-world problems"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Curriculum</h2>
            <div className="space-y-4">
              {[
                { week: 1, title: "Introduction to Algebraic Concepts", lessons: 5 },
                { week: 2, title: "Linear Equations and Inequalities", lessons: 6 },
                { week: 3, title: "Graphing and Functions", lessons: 5 },
                { week: 4, title: "Polynomials and Factoring", lessons: 6 }
              ].map((week, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg text-blue-600 mb-2">Week {week.week}: {week.title}</h3>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>{week.lessons} lessons</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Instructor</h2>
            <div className="flex items-center gap-4">
              <img src="/placeholder.svg" alt="Instructor" className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">Dr. Jane Smith</h3>
                <p className="text-gray-600">Mathematics Professor, XYZ University</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Dr. Smith has over 15 years of experience teaching mathematics at various levels. 
              Her passion for algebra and innovative teaching methods have helped thousands of students 
              master complex mathematical concepts with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Course Details */}
      <div className="w-80 bg-green-100 p-6">
        <div className="bg-white rounded-xl p-6 sticky top-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Details</h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Duration</p>
                <p className="text-gray-600">4 weeks</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Book className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Lessons</p>
                <p className="text-gray-600">22 lessons</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Level</p>
                <p className="text-gray-600">Beginner</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Certificate</p>
                <p className="text-gray-600">Yes, upon completion</p>
              </div>
            </li>
          </ul>
          <button className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors mb-4">
            Enroll Now
          </button>
          <p className="text-center text-gray-600 text-sm">
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}