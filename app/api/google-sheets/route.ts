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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type") || "all"
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const sheets = await initSheetsClient()

    // Object to store our response data
    const responseData: any = {}

    // Fetch client data if requested
    if (dataType === "clients" || dataType === "all") {
      const clientResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Clients!A2:Z",
      })

      const clientRows = clientResponse.data.values || []
      responseData.clients = clientRows.map((row) => ({
        id: row[0] || `CL${Math.floor(Math.random() * 10000)}`,
        name: row[1] || "Unknown Client",
        contact: row[2] || "No Contact",
        email: row[3] || "no-email@example.com",
        phone: row[4] || "No Phone",
        status: row[5] || "Inactive",
        value: row[6] || "$0",
      }))
    }

    // Fetch project data if requested
    if (dataType === "projects" || dataType === "all") {
      const projectResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Projects!A2:Z",
      })

      const projectRows = projectResponse.data.values || []
      responseData.projects = projectRows.map((row) => ({
        id: row[0] || `PRJ${Math.floor(Math.random() * 10000)}`,
        name: row[1] || "Unknown Project",
        clientId: row[2], // Reference to client ID
        type: row[3] || "Other",
        status: row[4] || "Not Started",
        startDate: row[5] || new Date().toISOString(),
        deadline: row[6] || new Date().toISOString(),
      }))
    }

    // Fetch agent data if requested
    if (dataType === "agents" || dataType === "all") {
      const agentResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Agents!A2:Z",
      })

      const agentRows = agentResponse.data.values || []
      responseData.agents = agentRows.map((row) => ({
        id: row[0] || `AGT${Math.floor(Math.random() * 10000)}`,
        name: row[1] || "Unknown Agent",
        email: row[2] || "no-email@example.com",
        phone: row[3] || "No Phone",
        specialties: (row[4] || "").split(",").map((s) => s.trim()),
        capacity: Number.parseInt(row[5] || "40", 10),
      }))
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error)
    return NextResponse.json({ error: `Failed to fetch data: ${error.message}` }, { status: 500 })
  }
}
