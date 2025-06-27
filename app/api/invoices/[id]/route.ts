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
      range: "Invoices!A2:Z",
    })

    const rows = response.data.values || []
    const invoice = rows
      .map((row) => ({
        id: row[0],
        clientId: row[1] || "",
        projectId: row[2] || "",
        number: row[3] || "",
        date: row[4] || new Date().toISOString().split('T')[0],
        dueDate: row[5] || new Date().toISOString().split('T')[0],
        status: row[6] || "draft",
        subtotal: parseFloat(row[7] || "0"),
        tax: parseFloat(row[8] || "0"),
        total: parseFloat(row[9] || "0"),
        notes: row[10] || "",
        items: JSON.parse(row[11] || "[]"),
      }))
      .find((inv) => inv.id === id)

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    return NextResponse.json(invoice)
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return NextResponse.json({ error: `Failed to fetch invoice: ${error.message}` }, { status: 500 })
  }
} 