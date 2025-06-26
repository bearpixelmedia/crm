"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  X,
  Upload,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
  FileArchive,
  FileIcon,
} from "lucide-react"
import { useData } from "@/context/data-context"

interface FileUploadProps {
  clientId?: string
  projectId?: string
  onComplete?: () => void
}

type UploadingFile = {
  id: string
  file: File
  progress: number
  error?: string
  preview?: string
}

export function FileUpload({ clientId, projectId, onComplete }: FileUploadProps) {
  const router = useRouter()
  const { clients, projects } = useData()
  const [selectedClient, setSelectedClient] = useState(clientId || "")
  const [selectedProject, setSelectedProject] = useState(projectId || "")
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get client-specific projects
  const clientProjects = selectedClient ? projects.filter((project) => project.clientId === selectedClient) : []

  function generateUploadId() {
    return `upload-${Math.floor(Math.random() * 1e8).toString(36)}`
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const newFiles: UploadingFile[] = Array.from(e.target.files).map((file) => ({
      id: generateUploadId(),
      file,
      progress: 0,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))

    setUploadingFiles((prev) => [...prev, ...newFiles])
  }

  // Remove a file from the upload list
  const removeFile = (id: string) => {
    setUploadingFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id)
      // Release any object URLs to avoid memory leaks
      const fileToRemove = prev.find((f) => f.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return filtered
    })
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Upload all files
  const uploadFiles = () => {
    if (!selectedClient) {
      alert("Please select a client")
      return
    }

    // Update progress for each file
    setUploadingFiles((prev) => prev.map((f) => ({ ...f, progress: 10 })))

    // Simulate upload progress
    let progress = 10
    const interval = setInterval(() => {
      progress += 10
      setUploadingFiles((prev) => prev.map((f) => ({ ...f, progress: Math.min(progress, 100) })))

      if (progress >= 100) {
        clearInterval(interval)

        // Simulate a short delay before completion
        setTimeout(() => {
          alert(`Successfully uploaded ${uploadingFiles.length} file(s)`)
          if (onComplete) {
            onComplete()
          } else {
            router.push("/files")
          }
        }, 500)
      }
    }, 500)
  }

  // Get appropriate icon for file type
  const getFileIcon = (file: File) => {
    const type = file.type

    if (type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8" />
    } else if (
      type.includes("spreadsheet") ||
      type.includes("excel") ||
      type.endsWith("xlsx") ||
      type.endsWith("xls")
    ) {
      return <FileSpreadsheet className="h-8 w-8" />
    } else if (
      type.includes("presentation") ||
      type.includes("powerpoint") ||
      type.endsWith("pptx") ||
      type.endsWith("ppt")
    ) {
      return <FilePresentationIcon className="h-8 w-8" />
    } else if (type.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else if (type.includes("zip") || type.includes("compressed") || type.includes("archive")) {
      return <FileArchive className="h-8 w-8" />
    } else {
      return <FileIcon className="h-8 w-8" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client and Project Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient} disabled={!!clientId}>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Project (Optional)</Label>
            <Select
              value={selectedProject}
              onValueChange={setSelectedProject}
              disabled={!selectedClient || !!projectId}
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {clientProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={triggerFileInput}
        >
          <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileSelect} />
          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">Click to upload or drag and drop files</p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, Documents, Spreadsheets, Images, Archives (Max 100MB each)
          </p>
        </div>

        {/* Selected Files */}
        {uploadingFiles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Selected Files ({uploadingFiles.length})</h3>
            <div className="space-y-3">
              {uploadingFiles.map((file) => (
                <div key={file.id} className="flex items-center p-2 border rounded-md">
                  <div className="flex-shrink-0 mr-2">
                    {file.preview ? (
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.file.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file.file)
                    )}
                  </div>
                  <div className="flex-grow min-w-0 mr-2">
                    <p className="text-sm font-medium truncate">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    {file.progress > 0 && <Progress value={file.progress} className="h-1 mt-1" />}
                    {file.error && <p className="text-xs text-destructive mt-1">{file.error}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(file.id)
                    }}
                    disabled={file.progress > 0 && file.progress < 100}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => router.push("/files")}>
          Cancel
        </Button>
        <Button
          onClick={uploadFiles}
          disabled={
            uploadingFiles.length === 0 ||
            !selectedClient ||
            uploadingFiles.some((f) => f.progress > 0 && f.progress < 100)
          }
        >
          Upload {uploadingFiles.length} {uploadingFiles.length === 1 ? "File" : "Files"}
        </Button>
      </CardFooter>
    </Card>
  )
}
