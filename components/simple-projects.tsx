import { useData } from "@/context/data-context"
import { useMemo, useState } from "react"

// Table columns: Project, Client, Type, Status, Progress, Deadline, Budget, Email, Phone
export function SimpleProjects() {
  const { projects, clients, loading, error, refreshData } = useData()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Helper to get client name by ID (handles both new and legacy fields)
  const getClientName = (project: any) => {
    if (project.client) return project.client
    if (project.clientIds && project.clientIds.length > 0) {
      const client = clients.find((c) => c.id === project.clientIds[0])
      return client ? client.name : "Unknown Client"
    }
    return "Unknown Client"
  }

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name?.toLowerCase().includes(search.toLowerCase()) ||
        project.project?.toLowerCase().includes(search.toLowerCase()) ||
        getClientName(project).toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter ? project.status === statusFilter : true
      return matchesSearch && matchesStatus
    })
  }, [projects, search, statusFilter, clients])

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading projects...</div>
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading projects: {error}
        <button
          className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={refreshData}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring"
            aria-label="Search projects"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {Array.from(new Set(projects.map((p) => p.status))).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto rounded shadow border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  No projects found.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{project.name || project.project || "Unnamed Project"}</td>
                  <td className="px-4 py-2">{getClientName(project)}</td>
                  <td className="px-4 py-2">{project.type}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${project.status === "Completed" ? "bg-green-100 text-green-700" : project.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{project.status}</span>
                  </td>
                  <td className="px-4 py-2">{(project as any).progress || "-"}</td>
                  <td className="px-4 py-2">{project.deadline || "-"}</td>
                  <td className="px-4 py-2">{project.budget || "-"}</td>
                  <td className="px-4 py-2">{project.email || "-"}</td>
                  <td className="px-4 py-2">{project.phone || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
