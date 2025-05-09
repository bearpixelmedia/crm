import { jsPDF } from "jspdf"
import "jspdf-autotable"
import type { Invoice } from "@/types/invoice"

// Add the missing type
// @ts-ignore
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const generateInvoicePDF = (invoice: Invoice, clientName: string) => {
  // Create new PDF document
  const doc = new jsPDF()

  // Set document properties
  doc.setProperties({
    title: `Invoice ${invoice.number}`,
    author: "White Fox Studios",
    subject: `Invoice for ${clientName}`,
    creator: "White Fox CRM",
  })

  // Add logo/header
  doc.setFontSize(20)
  doc.setTextColor(42, 42, 42)
  doc.text("WHITE FOX STUDIOS", 20, 20)

  // Add invoice info
  doc.setFontSize(12)
  doc.text(`INVOICE #: ${invoice.number}`, 20, 30)
  doc.text(`DATE: ${new Date(invoice.date).toLocaleDateString()}`, 20, 35)
  doc.text(`DUE DATE: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, 40)

  // Add status
  doc.setFontSize(12)
  let statusColor
  switch (invoice.status) {
    case "paid":
      statusColor = [0, 150, 0] // Green
      break
    case "pending":
      statusColor = [255, 150, 0] // Orange
      break
    case "overdue":
      statusColor = [255, 0, 0] // Red
      break
    default:
      statusColor = [100, 100, 100] // Gray
  }
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2])
  doc.text(`STATUS: ${invoice.status.toUpperCase()}`, 150, 30)

  // Reset text color
  doc.setTextColor(42, 42, 42)

  // Add client info
  doc.text("BILL TO:", 20, 50)
  doc.text(clientName, 20, 55)

  // Add invoice items table
  const tableColumn = ["Description", "Quantity", "Rate", "Amount"]
  const tableRows = invoice.items.map((item) => [
    item.description,
    item.quantity.toString(),
    `$${item.rate.toFixed(2)}`,
    `$${item.amount.toFixed(2)}`,
  ])

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 65,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [42, 42, 42] },
  })

  // Add totals
  const finalY = (doc as any).lastAutoTable.finalY + 10
  doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 150, finalY)
  doc.text(`Tax: $${invoice.tax.toFixed(2)}`, 150, finalY + 5)
  doc.text(`Total: $${invoice.total.toFixed(2)}`, 150, finalY + 10)

  // Add notes
  if (invoice.notes) {
    doc.text("Notes:", 20, finalY + 20)
    doc.setFontSize(10)
    const splitNotes = doc.splitTextToSize(invoice.notes, 170)
    doc.text(splitNotes, 20, finalY + 25)
  }

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(
      "White Fox Studios • 123 Marketing Way, San Francisco, CA 94103 • contact@whitefoxstudios.com • (555) 123-4567",
      105,
      287,
      { align: "center" },
    )
    doc.text(`Page ${i} of ${pageCount}`, 105, 292, { align: "center" })
  }

  return doc
}

export const downloadInvoicePDF = (invoice: Invoice, clientName: string) => {
  const doc = generateInvoicePDF(invoice, clientName)
  doc.save(`invoice-${invoice.number}.pdf`)
}
