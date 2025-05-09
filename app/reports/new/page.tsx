import { ReportBuilder } from "@/components/report-builder"

export default function NewReportPage() {
  return (
    <div className="p-6 space-y-6">
      <ReportBuilder isNew={true} />
    </div>
  )
}
