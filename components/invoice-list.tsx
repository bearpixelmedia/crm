"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Invoice } from "@/types/invoice"

// Mock data for invoices
const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    clientId: "client1",
    projectId: "project1",
    number: "INV-2023-001",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    status: "paid",
    items: [
      { id: "item1", description: "SEO Audit", quantity: 1, rate: 500, amount: 500 },
      { id: "item2", description: "Keyword Research", quantity: 1, rate: 300, amount: 300 },
    ],
    subtotal: 800,
    tax: 80,
    total: 880,
  },
  {
    id: "INV-002",
    clientId: "client2",
    projectId: "project2",
    number: "INV-2023-002",
    date: "2023-05-05",
    dueDate: "2023-05-20",
    status: "pending",
    items: [{ id: "item1", description: "Content Creation", quantity: 4, rate: 250, amount: 1000 }],
    subtotal: 1000,
    tax: 100,
    total: 1100,
  },
  {
    id: "INV-003",
    clientId: "client3",
    number: "INV-2023-003",
    date: "2023-05-10",
    dueDate: "2023-05-25",
    status: "overdue",
    items: [
      { id: "item1", description: "Website Optimization", quantity: 1, rate: 750, amount: 750 },
      { id: "item2", description: "Backlink Building", quantity: 1, rate: 500, amount: 500 },
    ],
    subtotal: 1250,
    tax: 125,
    total: 1375,
  },
  {
    id: "INV-004",
    clientId: "client1",
    projectId: "project3",
    number: "INV-2023-004",
    date: "2023-05-15",
    dueDate: "2023-05-30",
    status: "draft",
    items: [{ id: "item1", description: "Monthly SEO Maintenance", quantity: 1, rate: 450, amount: 450 }],
    subtotal: 450,
    tax: 45,
    total: 495,
  },
]

// Status badge colors
const statusColors = {
  draft: "bg-gray-200 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Invoices</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="w-[200px] sm:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => router.push("/invoices/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[invoice.status]}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(invoice.total)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/invoices/${invoice.id}`)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
