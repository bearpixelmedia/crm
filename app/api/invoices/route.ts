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
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    await client.authorize()
    return google.sheets({ version: "v4", auth: client })
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error)
    throw new Error(`Failed to initialize Google Sheets client: ${error.message}`)
  }
}

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 8)
  return `${prefix}${timestamp}${randomPart}`.toUpperCase()
}

export async function GET() {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const sheets = await initSheetsClient()

    // Try to fetch from existing sheet structure first
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Invoices!A2:Z",
      })

      const rows = response.data.values || []
      const invoices = rows.map((row) => ({
        id: row[0] || generateId("INV"),
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

      return NextResponse.json(invoices)
    } catch (sheetError) {
      // If Invoices sheet doesn't exist, return empty array
      console.log("Invoices sheet not found, returning empty array")
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json({ error: `Failed to fetch invoices: ${error.message}` }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const invoice = await request.json()
    const sheets = await initSheetsClient()

    const newId = generateId("INV")
    const values = [
      [
        newId,
        invoice.clientId || "",
        invoice.projectId || "",
        invoice.number || `INV-${Date.now()}`,
        invoice.date || new Date().toISOString().split('T')[0],
        invoice.dueDate || new Date().toISOString().split('T')[0],
        invoice.status || "draft",
        invoice.subtotal || 0,
        invoice.tax || 0,
        invoice.total || 0,
        invoice.notes || "",
        JSON.stringify(invoice.items || []),
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Invoices!A:L",
      valueInputOption: "RAW",
      requestBody: { values },
    })

    return NextResponse.json({ id: newId, ...invoice })
  } catch (error) {
    console.error("Error creating invoice:", error)
    return NextResponse.json({ error: `Failed to create invoice: ${error.message}` }, { status: 500 })
  }
} 