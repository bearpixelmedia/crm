import { InvoiceList } from "@/components/invoice-list"

export default function InvoicesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
      <p className="text-muted-foreground">Manage and track client invoices.</p>
      <InvoiceList />
    </div>
  )
}
