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
        range: "Activities!A2:Z",
      })

      const rows = response.data.values || []
      const activities = rows.map((row) => ({
        id: row[0] || generateId("ACT"),
        type: row[1] || "general",
        action: row[2] || "updated",
        subject: row[3] || "Unknown",
        user: {
          name: row[4] || "Unknown User",
          initials: row[5] || "UU",
        },
        timestamp: new Date(row[6] || new Date().toISOString()),
      }))

      return NextResponse.json(activities)
    } catch (sheetError) {
      // If Activities sheet doesn't exist, return empty array
      console.log("Activities sheet not found, returning empty array")
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json({ error: `Failed to fetch activities: ${error.message}` }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const activity = await request.json()
    const sheets = await initSheetsClient()

    const newId = generateId("ACT")
    const values = [
      [
        newId,
        activity.type || "general",
        activity.action || "updated",
        activity.subject || "Unknown",
        activity.user?.name || "Unknown User",
        activity.user?.initials || "UU",
        new Date().toISOString(),
      ]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Activities!A:G",
      valueInputOption: "RAW",
      requestBody: { values },
    })

    return NextResponse.json({ id: newId, ...activity })
  } catch (error) {
    console.error("Error creating activity:", error)
    return NextResponse.json({ error: `Failed to create activity: ${error.message}` }, { status: 500 })
  }
} 