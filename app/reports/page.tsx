import { ReportsList } from "@/components/reports-list"

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      <p className="text-muted-foreground">Create and manage automated reports.</p>
      <ReportsList />
    </div>
  )
}
