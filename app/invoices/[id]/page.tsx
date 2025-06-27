"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { InvoiceEditor } from "@/components/invoice-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Invoice } from "@/types/invoice"
import { useData } from "@/context/data-context"

export default function InvoiceDetailsPage() {
  const params = useParams()
  const { projects, clients } = useData()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true)
      try {
        // Fetch invoice from API
        const response = await fetch(`/api/invoices/${params.id}`)
        if (!response.ok) throw new Error("Invoice not found")
        const data = await response.json()
        setInvoice(data)
        setError(null)
      } catch (err) {
        setError("Failed to load invoice details")
      } finally {
        setLoading(false)
      }
    }
    if (params.id) fetchInvoice()
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
