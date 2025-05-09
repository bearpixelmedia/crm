import { InvoiceEditor } from "@/components/invoice-editor"

export default function NewInvoicePage() {
  return (
    <div className="p-6 space-y-6">
      <InvoiceEditor isNew={true} />
    </div>
  )
}
