import { DebugConnection } from "@/components/debug-connection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEnvironmentName } from "@/lib/environment"

export default function DebugPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Debug Tools</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
            <CardDescription>Current environment and configuration details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Environment:</span>
                <span>{getEnvironmentName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">NEXT_PUBLIC_VERCEL_ENV:</span>
                <span>{process.env.NEXT_PUBLIC_VERCEL_ENV || "Not set"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <DebugConnection />
      </div>
    </div>
  )
}
