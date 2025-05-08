import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { DebugConnection } from "@/components/debug-connection"
import { EnvDebug } from "@/components/env-debug"

export default function DebugPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Debug Tools</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 lg:col-span-1">
            <EnvDebug />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <DebugConnection />
          </div>
        </div>
      </div>
    </div>
  )
}
