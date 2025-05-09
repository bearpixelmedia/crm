export type FileType = "image" | "document" | "spreadsheet" | "presentation" | "pdf" | "archive" | "other"

export type File = {
  id: string
  name: string
  type: FileType
  size: number
  url: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: string
  clientId?: string
  projectId?: string
  tags?: string[]
}

export type Folder = {
  id: string
  name: string
  parentId?: string
  clientId?: string
  projectId?: string
  createdAt: string
  createdBy: string
}
