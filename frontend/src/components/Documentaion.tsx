import { Link } from "react-router-dom"
import { ArrowLeft, FileText, Database, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="h-6 border-l border-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
          </div>
          <p className="mt-2 text-gray-600">Complete guide to sending mail by data</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Send Mail by Data</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our Mail Toolkit provides a streamlined workflow for sending personalized emails to multiple recipients
            using data from various file formats. Follow this step-by-step guide to efficiently manage your email
            campaigns.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-blue-800 font-medium">Quick Overview</h3>
                <p className="text-blue-700 text-sm mt-1">
                  The process involves 4 main steps: Extract Data → Generate Mail → Send Mail → Track Results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Step 1: Data Extraction</h3>
                <p className="text-gray-600">Extract and process your recipient data</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Supported File Formats:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-gray-900">CSV</div>
                  <div className="text-sm text-gray-600">Comma Separated</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-gray-900">XLSX</div>
                  <div className="text-sm text-gray-600">Excel Files</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-gray-900">TSV</div>
                  <div className="text-sm text-gray-600">Tab Separated</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-gray-900">PDF</div>
                  <div className="text-sm text-gray-600">PDF Documents</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">How it works:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>
                    Navigate to <strong>"Data Extractor from Raw"</strong> from the home page
                  </li>
                  <li>Upload your file containing recipient data (CSV, XLSX, TSV, or PDF)</li>
                  <li>The system automatically converts your data to JSON format</li>
                  <li>Backend processes and saves the structured data</li>
                  <li>Data is validated and ready for mail generation</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h5 className="font-medium text-gray-900 mb-2">Expected Data Structure:</h5>
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  {`{
  "recipients": [
    {
      "email": "john@example.com",
      "name": "John Doe",
      "company": "ABC Corp",
      "custom_field": "value"
    },
    {
      "email": "jane@example.com", 
      "name": "Jane Smith",
      "company": "XYZ Inc",
      "custom_field": "value"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Step 2: Mail Generation</h3>
                <p className="text-gray-600">Create personalized email content</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Once your data is processed, you have two options to generate your email content:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Option A: Compose Mail</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Manual email composition</li>
                    <li>• Full control over content</li>
                    <li>• Custom HTML/text formatting</li>
                    <li>• Personalization variables</li>
                  </ul>
                  <Link
                    to="/compose-mail"
                    className="inline-block mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Go to Compose Mail →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Option B: Email Generator</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• AI-powered email generation</li>
                    <li>• Template-based creation</li>
                    <li>• Automatic personalization</li>
                    <li>• Quick and efficient</li>
                  </ul>
                  <Link
                    to="/email-generator"
                    className="inline-block mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Go to Email Generator →
                  </Link>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <h5 className="font-medium text-green-800 mb-2">Personalization Variables</h5>
                <p className="text-green-700 text-sm mb-2">Use these variables in your email content:</p>
                <div className="text-sm text-green-700 font-mono">
                  {`{{name}} - Recipient's name`}
                  <br />
                  {`{{email}} - Recipient's email`}
                  <br />
                  {`{{company}} - Company name`}
                  <br />
                  {`{{custom_field}} - Any custom field from your data`}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Backend Processing:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Generated email content is automatically saved</li>
                  <li>Personalization variables are mapped to your data</li>
                  <li>Email templates are validated and optimized</li>
                  <li>Ready for bulk sending process</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Step 3: Send Mail</h3>
                <p className="text-gray-600">Deliver emails to all recipients</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                With your data processed and email content generated, you're ready to send personalized emails to all
                recipients.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Sending Options:</h4>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Individual Send Mail</h5>
                  <p className="text-sm text-gray-700 mb-2">For single recipient or manual sending:</p>
                  <Link
                    to="/send-mail"
                    className="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Go to Send Mail →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Bulk Send to All Recipients</h5>
                  <p className="text-sm text-gray-700 mb-2">Send to all recipients from your processed data:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside mb-2">
                    <li>Automatically sends to all emails in your dataset</li>
                    <li>Personalizes content for each recipient</li>
                    <li>Handles delivery scheduling and rate limiting</li>
                    <li>Provides real-time sending progress</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Club Members</h5>
                  <p className="text-sm text-gray-700 mb-2">For organized group communications:</p>
                  <Link
                    to="/send-club-mail"
                    className="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Go to Send Club Mail →
                  </Link>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
                <h5 className="font-medium text-purple-800 mb-2">Sending Process:</h5>
                <ol className="list-decimal list-inside space-y-1 text-purple-700 text-sm">
                  <li>System retrieves your processed recipient data</li>
                  <li>Email content is personalized for each recipient</li>
                  <li>Emails are queued for delivery</li>
                  <li>Batch sending with rate limiting to ensure deliverability</li>
                  <li>Real-time progress tracking and error handling</li>
                  <li>Delivery confirmation and reporting</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Step 4: Track & Analyze</h3>
                <p className="text-gray-600">Monitor your email campaign performance</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                After sending your emails, use our analytics tools to track performance and optimize future campaigns.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Delivery Metrics</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Total emails sent</li>
                    <li>• Successful deliveries</li>
                    <li>• Bounce rates</li>
                    <li>• Failed deliveries</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Engagement Metrics</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Open rates</li>
                    <li>• Click-through rates</li>
                    <li>• Response rates</li>
                    <li>• Unsubscribe rates</li>
                  </ul>
                </div>
              </div>

              <Link
                to="/mail-analytics"
                className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                View Mail Analytics →
              </Link>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-2xl p-8 shadow-md mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Data Preparation</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Ensure email addresses are valid and properly formatted</li>
                <li>• Include all necessary personalization fields</li>
                <li>• Clean and deduplicate your data before upload</li>
                <li>• Use consistent column headers across files</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Email Content</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Test personalization variables before bulk sending</li>
                <li>• Keep subject lines concise and engaging</li>
                <li>• Include clear call-to-action buttons</li>
                <li>• Ensure mobile-responsive design</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Delivery Optimization</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Send emails during optimal hours</li>
                <li>• Use appropriate sending frequency</li>
                <li>• Monitor bounce rates and clean lists regularly</li>
                <li>• Comply with anti-spam regulations</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Performance Tracking</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Monitor key metrics regularly</li>
                <li>• A/B test different subject lines and content</li>
                <li>• Segment audiences for better targeting</li>
                <li>• Use analytics to improve future campaigns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
          <p className="mb-6 opacity-90">Ready to send your first data-driven email campaign?</p>

          <div className="grid md:grid-cols-4 gap-4 text-center">
            <Link
              to="/data-extractor"
              className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="text-2xl font-bold mb-1">1</div>
              <div className="text-sm">Extract Data</div>
            </Link>
            <Link
              to="/email-generator"
              className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="text-2xl font-bold mb-1">2</div>
              <div className="text-sm">Generate Mail</div>
            </Link>
            <Link
              to="/send-mail"
              className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-sm">Send Mail</div>
            </Link>
            <Link
              to="/mail-analytics"
              className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="text-2xl font-bold mb-1">4</div>
              <div className="text-sm">Track Results</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
