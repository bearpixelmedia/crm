"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { InvoiceEditor } from "@/components/invoice-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Invoice } from "@/types/invoice"

// Mock data for a specific invoice
const mockInvoices: Record<string, Invoice> = {
  "INV-001": {
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
    notes: "Thank you for your business!",
  },
  "INV-002": {
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
  "INV-003": {
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
}

export default function InvoiceDetailsPage() {
  const params = useParams()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch invoice details
    const fetchInvoice = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/invoices/${params.id}`);
        // const data = await response.json();

        // Using mock data instead
        const mockInvoice = mockInvoices[params.id as string]

        if (!mockInvoice) {
          throw new Error("Invoice not found")
        }

        setInvoice(mockInvoice)
        setError(null)
      } catch (err) {
        console.error("Error fetching invoice:", err)
        setError("Failed to load invoice details")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchInvoice()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-[250px]" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-[200px] w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <h2 className="text-xl font-medium">Error</h2>
              <p className="text-muted-foreground mt-2">{error || "Invoice not found"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <InvoiceEditor invoice={invoice} />
    </div>
  )
}
