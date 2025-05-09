export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled"

export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export type Invoice = {
  id: string
  clientId: string
  projectId?: string
  number: string
  date: string
  dueDate: string
  status: InvoiceStatus
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
}
