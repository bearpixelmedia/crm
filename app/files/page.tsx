import { FileBrowser } from "@/components/file-browser"

export default function FilesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">File Storage</h1>
      <p className="text-muted-foreground">Manage and organize all your files.</p>
      <FileBrowser />
    </div>
  )
}
