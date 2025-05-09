"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Plus, Send, Save, Download, ArrowLeft } from "lucide-react"
import { useData } from "@/context/data-context"
import type { Invoice, InvoiceItem, InvoiceStatus } from "@/types/invoice"

interface InvoiceEditorProps {
  invoice?: Invoice
  isNew?: boolean
}

export function InvoiceEditor({ invoice, isNew = false }: InvoiceEditorProps) {
  const router = useRouter()
  const { clients, projects } = useData()

  const [invoiceData, setInvoiceData] = useState<Invoice>(() => {
    if (invoice) return { ...invoice }

    // Default new invoice
    return {
      id: `INV-${Math.floor(Math.random() * 1000)}`,
      clientId: "",
      number: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "draft" as InvoiceStatus,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    }
  })

  const [clientProjects, setClientProjects] = useState<any[]>([])

  // Update available projects when client changes
  useEffect(() => {
    if (invoiceData.clientId) {
      const filteredProjects = projects.filter((p) => p.clientId === invoiceData.clientId)
      setClientProjects(filteredProjects)
    } else {
      setClientProjects([])
    }
  }, [invoiceData.clientId, projects])

  // Calculate totals when items change
  useEffect(() => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax rate
    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      tax,
      total: subtotal + tax,
    }))
  }, [invoiceData.items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInvoiceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setInvoiceData((prev) => ({ ...prev, [name]: value }))
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }

    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  const updateItem = (id: string, field: string, value: string | number) => {
    setInvoiceData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }

          return updatedItem
        }
        return item
      })

      return { ...prev, items: updatedItems }
    })
  }

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const saveInvoice = () => {
    // In a real app, this would save to backend
    console.log("Saving invoice:", invoiceData)
    alert(`Invoice ${invoiceData.number} saved!`)
    router.push("/invoices")
  }

  const sendInvoice = () => {
    // Update status to pending and save
    setInvoiceData((prev) => ({ ...prev, status: "pending" }))
    // In a real app, this would save to backend and send email
    console.log("Sending invoice:", invoiceData)
    alert(`Invoice ${invoiceData.number} sent!`)
    router.push("/invoices")
  }

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/invoices")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle>{isNew ? "Create New Invoice" : `Edit Invoice ${invoiceData.number}`}</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/invoices")}>
            Cancel
          </Button>
          <Button variant="outline" onClick={saveInvoice}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={sendInvoice}>
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Invoice Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Invoice Number</label>
            <Input name="number" value={invoiceData.number} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Invoice Date</label>
            <Input type="date" name="date" value={invoiceData.date} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleInputChange} />
          </div>

          {/* Client and Project Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Client</label>
            <Select value={invoiceData.clientId} onValueChange={(value) => handleSelectChange("clientId", value)}>
              <SelectTrigger>
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
            <label className="text-sm font-medium">Project (Optional)</label>
            <Select
              value={invoiceData.projectId || ""}
              onValueChange={(value) => handleSelectChange("projectId", value)}
              disabled={!invoiceData.clientId}
            >
              <SelectTrigger>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={invoiceData.status}
              onValueChange={(value) => handleSelectChange("status", value as InvoiceStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                      No items added. Click "Add Item" to add invoice items.
                    </TableCell>
                  </TableRow>
                ) : (
                  invoiceData.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Invoice Totals */}
        <div className="flex flex-col items-end space-y-2 text-sm">
          <div className="flex justify-between w-[300px]">
            <span>Subtotal:</span>
            <span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
          </div>
          <div className="flex justify-between w-[300px]">
            <span>Tax (10%):</span>
            <span className="font-medium">{formatCurrency(invoiceData.tax)}</span>
          </div>
          <div className="flex justify-between w-[300px] text-lg font-bold border-t pt-2 mt-2">
            <span>Total:</span>
            <span>{formatCurrency(invoiceData.total)}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea
            name="notes"
            value={invoiceData.notes || ""}
            onChange={handleInputChange}
            placeholder="Enter any additional notes or payment terms..."
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => router.push("/invoices")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={sendInvoice}>
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
