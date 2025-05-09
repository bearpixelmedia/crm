import { ClientAnalytics } from "@/components/client-analytics"
import { ClientDetail } from "@/components/client-detail"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <ClientDetail clientId={params.id} />
        </TabsContent>

        <TabsContent value="analytics">
          <ClientAnalytics clientId={params.id} />
        </TabsContent>

        <TabsContent value="projects">
          <div className="rounded-md border p-8 text-center">Projects list will be displayed here</div>
        </TabsContent>

        <TabsContent value="communication">
          <div className="rounded-md border p-8 text-center">Communication history will be displayed here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
