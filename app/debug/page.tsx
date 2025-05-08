import { DependencyChecker } from "@/components/dependency-checker"
import { UserNavChecker } from "@/components/user-nav-checker"
import { DashboardShell } from "@/components/dashboard-shell"

export default function DebugPage() {
  return (
    <DashboardShell>
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Dependency Debug Page</h1>
        <p className="mb-6 text-muted-foreground">
          This page checks if all required dependencies are correctly installed and loaded. Check the browser console
          for more detailed information.
        </p>
        <DependencyChecker />
        <UserNavChecker />
      </div>
    </DashboardShell>
  )
}
