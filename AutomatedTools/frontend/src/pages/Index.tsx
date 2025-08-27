import { Link, useNavigate } from "react-router-dom"
import { Mail, FileText, Users, PenTool, Sparkles } from "lucide-react"

export default function Index() {
  const navigate=useNavigate();
  const toolkitFeatures = [
    {
      title: "Data Extractor from Raw",
      description: "Extract and process raw email data",
      icon: FileText,
      path: "/file-processor",
      color: "text-blue-600",
    },
    {
      title: "Send Mail",
      description: "Send individual emails quickly",
      icon: Mail,
      path: "/mail-sender",
      color: "text-green-600",
    },
    {
      title: "Compose Mail",
      description: "Create and draft new emails",
      icon: PenTool,
      path: "/email-composer",
      color: "text-orange-600",
    },
    {
      title: "Email Generator",
      description: "Generate emails with AI assistance",
      icon: Sparkles,
      path: "/email-generator",
      color: "text-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Tools</h1>
          <p className="mt-2 text-gray-600">Your comprehensive management solution</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to My Toolkit</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your email workflow with our powerful suite of tools. Choose from the options below to get
            started.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolkitFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Link key={index} to={feature.path} className="group block">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`p-4 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                    <div
                      className={`inline-flex items-center text-sm font-medium ${feature.color} group-hover:underline`}
                    >
                      Get Started
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-6">
              Our Mail Toolkit is designed to make email management effortless. Each tool is optimized for different use
              cases to help you work more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium" onClick={()=>navigate("/documentation")}>
                View Documentation
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
