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
        range: "Events!A2:Z",
      })

      const rows = response.data.values || []
      const events = rows.map((row) => ({
        id: row[0] || generateId("EVT"),
        title: row[1] || "Untitled Event",
        start: new Date(row[2] || new Date().toISOString()),
        end: new Date(row[3] || new Date().toISOString()),
        type: row[4] || "meeting",
        client: row[5] || "",
        project: row[6] || "",
        description: row[7] || "",
        allDay: row[8] === "true" || false,
      }))

      return NextResponse.json(events)
    } catch (sheetError) {
      // If Events sheet doesn't exist, return empty array
      console.log("Events sheet not found, returning empty array")
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: `Failed to fetch events: ${error.message}` }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const event = await request.json()
    const sheets = await initSheetsClient()

    const newId = generateId("EVT")
    const values = [
      [
        newId,
        event.title || "Untitled Event",
        event.start || new Date().toISOString(),
        event.end || new Date().toISOString(),
        event.type || "meeting",
        event.client || "",
        event.project || "",
        event.description || "",
        event.allDay ? "true" : "false",
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Events!A:I",
      valueInputOption: "RAW",
      requestBody: { values },
    })

    return NextResponse.json({ id: newId, ...event })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: `Failed to create event: ${error.message}` }, { status: 500 })
  }
} 