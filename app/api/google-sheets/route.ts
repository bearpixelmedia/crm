import { NextResponse } from "next/server"
import { google } from "googleapis"
import { JWT } from "google-auth-library"

// Simple ID generator
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`.toUpperCase()
}

// Initialize Google Sheets client
const initSheetsClient = async () => {
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google Sheets credentials")
  }

  const client = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })

  return google.sheets({ version: "v4", auth: client })
}

export async function GET() {
  try {
    const sheets = await initSheetsClient()
    const spreadsheetId = "1fe_MbyweSJpvvJVNWkFKog2YZLpE5S0J1LWU9SBveiQ"

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A:Z",
    })

    const rows = response.data.values || []
    const projects: any[] = []
    const clients: any[] = []
    const clientMap = new Map()

    // Process each row to create projects and clients
    rows.slice(1).forEach((row) => {
      const projectId = generateId("PRJ")
      const clientName = row[2] || "Unknown Client"
      const clientEmail = row[7] || ""
      const clientPhone = row[8] || ""
      const clientKey = `${clientName}-${clientEmail}`

      // Create or get client
      let clientId = ""
      if (clientMap.has(clientKey)) {
        clientId = clientMap.get(clientKey)
        // Add project to existing client
        const client = clients.find(c => c.id === clientId)
        if (client) client.projectIds.push(projectId)
      } else {
        clientId = generateId("CLI")
        clientMap.set(clientKey, clientId)
        clients.push({
          id: clientId,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          projectIds: [projectId]
        })
      }

      // Create project
      projects.push({
        id: projectId,
        name: row[1] || "Unknown Project",
        type: row[3] || "Website", 
        status: row[4] || "Active",
        deadline: row[5] || "TBD",
        budget: row[6] || "$0.00",
        clientIds: [clientId],
        
        // Legacy compatibility
        project: row[1] || "Unknown Project",
        client: clientName,
        email: clientEmail,
        phone: clientPhone
      })
    })

    return NextResponse.json({
      success: true,
      projects,
      clients,
      stats: {
        totalProjects: projects.length,
        totalClients: clients.length,
        multiClientProjects: projects.filter(p => p.clientIds.length > 1).length,
        multiProjectClients: clients.filter(c => c.projectIds.length > 1).length
      }
    })

  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
