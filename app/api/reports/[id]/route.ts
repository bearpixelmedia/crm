import { NextResponse } from "next/server"
import { google } from "googleapis"
import { JWT } from "google-auth-library"

// Initialize the sheets API client
const initSheetsClient = async () => {
  try {
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing required environment variables for Google Sheets API")
    }

    const client = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    await client.authorize()
    return google.sheets({ version: "v4", auth: client })
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error)
    throw new Error(`Failed to initialize Google Sheets client: ${error.message}`)
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const sheets = await initSheetsClient()
    const { id } = params

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Reports!A2:Z",
    })

    const rows = response.data.values || []
    const report = rows
      .map((row) => ({
        id: row[0],
        name: row[1] || "Untitled Report",
        type: row[2] || "general",
        description: row[3] || "",
        createdAt: row[4] || new Date().toISOString(),
        createdBy: row[5] || "Unknown",
        frequency: row[6] || "monthly",
        lastGenerated: row[7] || "",
        nextGeneration: row[8] || "",
        status: row[9] || "draft",
        recipients: (row[10] || "").split(",").filter(r => r.trim()),
        clientId: row[11] || "",
        projectId: row[12] || "",
        templateId: row[13] || "",
      }))
      .find((rpt) => rpt.id === id)

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json({ error: `Failed to fetch report: ${error.message}` }, { status: 500 })
  }
} 