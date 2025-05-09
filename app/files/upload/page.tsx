import { FileUpload } from "@/components/file-upload"

export default function UploadFilePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Upload Files</h1>
      <p className="text-muted-foreground">Upload new files to the system.</p>
      <FileUpload />
    </div>
  )
}
