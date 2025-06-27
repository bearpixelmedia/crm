"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Invoice } from "@/types/invoice"
import { useData } from "@/context/data-context"

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
  const { clients, projects } = useData()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Fetch invoices from API or context
    const fetchInvoices = async () => {
      const response = await fetch("/api/invoices")
      if (response.ok) {
        const data = await response.json()
        setInvoices(data)
      }
    }
    fetchInvoices()
  }, [])

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
