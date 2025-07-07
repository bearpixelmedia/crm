export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">White Fox Studios CRM</h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">Welcome to your CRM dashboard.</p>
        <div className="space-y-2">
          <a 
            href="/projects" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  )
}
