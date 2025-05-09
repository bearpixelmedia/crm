"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import {
  Search,
  Upload,
  FolderPlus,
  Download,
  Trash2,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
  FileArchive,
  FileIcon,
  Grid,
  List,
  ExternalLink,
  Share2,
} from "lucide-react"
import { useData } from "@/context/data-context"
import type { File, Folder, FileType } from "@/types/file"

// Mock data
const mockFiles: File[] = [
  {
    id: "file1",
    name: "SEO Audit Report - Q2.pdf",
    type: "pdf",
    size: 2450000,
    url: "#",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-10T14:30:00Z",
    clientId: "client1",
    projectId: "project1",
    tags: ["report", "seo", "audit"],
  },
  {
    id: "file2",
    name: "Website Analytics.xlsx",
    type: "spreadsheet",
    size: 1250000,
    url: "#",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-05-08T09:15:00Z",
    clientId: "client1",
    projectId: "project1",
    tags: ["analytics", "data"],
  },
  {
    id: "file3",
    name: "Content Calendar.xlsx",
    type: "spreadsheet",
    size: 980000,
    url: "#",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-05T11:45:00Z",
    clientId: "client1",
    projectId: "project1",
    tags: ["content", "planning"],
  },
  {
    id: "file4",
    name: "Client Logo.png",
    type: "image",
    size: 560000,
    url: "#",
    thumbnailUrl: "/placeholder.svg?key=qd4xm",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-05-03T16:20:00Z",
    clientId: "client1",
    tags: ["logo", "branding"],
  },
  {
    id: "file5",
    name: "Marketing Presentation.pptx",
    type: "presentation",
    size: 3450000,
    url: "#",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-01T10:00:00Z",
    clientId: "client1",
    projectId: "project1",
    tags: ["presentation", "marketing"],
  },
  {
    id: "file6",
    name: "Contract.pdf",
    type: "pdf",
    size: 750000,
    url: "#",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-04-29T14:10:00Z",
    clientId: "client1",
    tags: ["legal", "contract"],
  },
]

const mockFolders: Folder[] = [
  {
    id: "folder1",
    name: "SEO Reports",
    createdAt: "2023-04-15T09:00:00Z",
    createdBy: "John Doe",
    clientId: "client1",
    projectId: "project1",
  },
  {
    id: "folder2",
    name: "Marketing Materials",
    createdAt: "2023-04-20T11:30:00Z",
    createdBy: "Jane Smith",
    clientId: "client1",
  },
  {
    id: "folder3",
    name: "Contracts",
    createdAt: "2023-04-25T14:45:00Z",
    createdBy: "John Doe",
    clientId: "client1",
  },
]

// Helper function to get file icon
const getFileIcon = (type: FileType) => {
  switch (type) {
    case "image":
      return <ImageIcon className="h-5 w-5" />
    case "document":
      return <FileText className="h-5 w-5" />
    case "spreadsheet":
      return <FileSpreadsheet className="h-5 w-5" />
    case "presentation":
      return <FilePresentationIcon className="h-5 w-5" />
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />
    case "archive":
      return <FileArchive className="h-5 w-5" />
    default:
      return <FileIcon className="h-5 w-5" />
  }
}

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function FileBrowser() {
  const router = useRouter()
  const { clients, projects } = useData()

  const [files, setFiles] = useState<File[]>(mockFiles)
  const [folders, setFolders] = useState<Folder[]>(mockFolders)
  const [searchQuery, setSearchQuery] = useState("")
  const [clientFilter, setClientFilter] = useState<string>("")
  const [projectFilter, setProjectFilter] = useState<string>("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  // Filtered files and folders based on search and filters
  const filteredFiles = files.filter((file) => {
    // Search filter
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Client filter
    const matchesClient = !clientFilter || file.clientId === clientFilter

    // Project filter
    const matchesProject = !projectFilter || file.projectId === projectFilter

    return matchesSearch && matchesClient && matchesProject
  })

  const filteredFolders = folders.filter((folder) => {
    // Search filter
    const matchesSearch = folder.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Client filter
    const matchesClient = !clientFilter || folder.clientId === clientFilter

    // Project filter
    const matchesProject = !projectFilter || folder.projectId === projectFilter

    return matchesSearch && matchesClient && matchesProject
  })

  // Toggle file selection
  const toggleFileSelection = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId))
    } else {
      setSelectedFiles([...selectedFiles, fileId])
    }
  }

  // Select/deselect all files
  const toggleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id))
    }
  }

  // Delete selected files
  const deleteSelectedFiles = () => {
    if (selectedFiles.length === 0) return

    if (confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
      setFiles(files.filter((file) => !selectedFiles.includes(file.id)))
      setSelectedFiles([])
    }
  }

  // Download selected files
  const downloadSelectedFiles = () => {
    if (selectedFiles.length === 0) return

    // In a real app, this would trigger actual downloads
    alert(`Downloading ${selectedFiles.length} file(s)...`)
  }

  // Upload new file - would be implemented with a proper upload component in a real app
  const uploadFile = () => {
    alert("File upload functionality would be implemented here.")
    // In a real app, this would trigger a file picker and upload process
  }

  // Create new folder
  const createFolder = () => {
    const folderName = prompt("Enter folder name:")
    if (folderName) {
      const newFolder: Folder = {
        id: `folder${folders.length + 1}`,
        name: folderName,
        createdAt: new Date().toISOString(),
        createdBy: "Current User", // Would use actual user in real app
        clientId: clientFilter || undefined,
        projectId: projectFilter || undefined,
      }

      setFolders([...folders, newFolder])
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle>File Storage</CardTitle>
            <CardDescription>Manage and organize your files</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
              {viewMode === "list" ? <Grid className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
              {viewMode === "list" ? "Grid View" : "List View"}
            </Button>
            <Button variant="outline" size="sm" onClick={createFolder}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button size="sm" onClick={uploadFile}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/files">Files</BreadcrumbLink>
            </BreadcrumbItem>
            {/* Dynamic breadcrumbs would go here in a real app */}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={setProjectFilter} disabled={!clientFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects
                .filter((project) => !clientFilter || project.clientId === clientFilter)
                .map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions for selected files */}
        {selectedFiles.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-2 bg-muted rounded-md">
            <span className="text-sm font-medium">{selectedFiles.length} file(s) selected</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={downloadSelectedFiles}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedFiles([])}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={deleteSelectedFiles}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {viewMode === "list" ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">
                        <input
                          type="checkbox"
                          checked={selectedFiles.length > 0 && selectedFiles.length === filteredFiles.length}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFolders.map((folder) => (
                      <TableRow key={folder.id} className="group">
                        <TableCell className="w-[30px]"></TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FolderPlus className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>{folder.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>Folder</TableCell>
                        <TableCell>--</TableCell>
                        <TableCell>{folder.createdBy}</TableCell>
                        <TableCell>{formatDate(folder.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="opacity-0 group-hover:opacity-100 flex justify-end">
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredFiles.map((file) => (
                      <TableRow key={file.id} className="group">
                        <TableCell className="w-[30px]">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => toggleFileSelection(file.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type.charAt(0).toUpperCase() + file.type.slice(1)}</TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="opacity-0 group-hover:opacity-100 flex justify-end">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredFiles.length === 0 && filteredFolders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No files or folders match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFolders.map((folder) => (
                  <div key={folder.id} className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <FolderPlus className="h-8 w-8 text-yellow-500" />
                      <div className="truncate font-medium">{folder.name}</div>
                    </div>
                    <div className="mt-auto text-xs text-muted-foreground">{formatDate(folder.createdAt)}</div>
                  </div>
                ))}
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer flex flex-col relative"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="absolute top-2 right-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>

                    {file.type === "image" && file.thumbnailUrl ? (
                      <div className="h-24 flex items-center justify-center mb-2">
                        <img
                          src={file.thumbnailUrl || "/placeholder.svg"}
                          alt={file.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-24 flex items-center justify-center mb-2">{getFileIcon(file.type)}</div>
                    )}

                    <div className="truncate font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatFileSize(file.size)}</div>
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>{file.uploadedBy}</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {filteredFiles.length === 0 && filteredFolders.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No files or folders match your search
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12 text-muted-foreground">This tab would show recently accessed files.</div>
          </TabsContent>

          <TabsContent value="shared">
            <div className="text-center py-12 text-muted-foreground">This tab would show files shared with you.</div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-12 text-muted-foreground">This tab would show your favorite files.</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
