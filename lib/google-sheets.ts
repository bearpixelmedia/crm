import { JWT } from "google-auth-library"
import { google, type sheets_v4 } from "googleapis"

// These would come from environment variables in a real application
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
const SPREADSHEET_ID = process.env.SPREADSHEET_ID

// Initialize the sheets API client
const initSheetsClient = async (): Promise<sheets_v4.Sheets> => {
  try {
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      console.error("Missing required environment variables for Google Sheets API")
      console.error(`GOOGLE_CLIENT_EMAIL exists: ${!!GOOGLE_CLIENT_EMAIL}`)
      console.error(`GOOGLE_PRIVATE_KEY exists: ${!!GOOGLE_PRIVATE_KEY}`)
      console.error(`SPREADSHEET_ID exists: ${!!SPREADSHEET_ID}`)
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

// Fetch client data from the spreadsheet
export async function fetchClientData() {
  try {
    const sheets = await initSheetsClient()

    // Assuming 'Clients' is the name of your sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Clients!A2:Z", // Start from A2 to skip headers
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return []
    }

    // Map spreadsheet rows to client objects
    // Adjust these indices based on your actual spreadsheet structure
    return rows.map((row) => ({
      id: row[0] || `CL${Math.floor(Math.random() * 10000)}`,
      name: row[1] || "Unknown Client",
      contact: row[2] || "No Contact",
      email: row[3] || "no-email@example.com",
      phone: row[4] || "No Phone",
      status: row[5] || "Inactive",
      value: row[6] || "$0",
      // You can add more fields as needed
    }))
  } catch (error) {
    console.error("Error fetching client data:", error)
    throw new Error("Failed to fetch client data from Google Sheets")
  }
}

// Fetch project data from the spreadsheet
export async function fetchProjectData() {
  try {
    const sheets = await initSheetsClient()

    // Assuming 'Projects' is the name of your sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Projects!A2:Z", // Start from A2 to skip headers
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return []
    }

    // Map spreadsheet rows to project objects
    // Adjust these indices based on your actual spreadsheet structure
    return rows.map((row) => ({
      id: row[0] || `PRJ${Math.floor(Math.random() * 10000)}`,
      name: row[1] || "Unknown Project",
      clientId: row[2], // Reference to client ID
      type: row[3] || "Other",
      status: row[4] || "Not Started",
      startDate: row[5] || new Date().toISOString(),
      deadline: row[6] || new Date().toISOString(),
      // You can add more fields as needed
    }))
  } catch (error) {
    console.error("Error fetching project data:", error)
    throw new Error("Failed to fetch project data from Google Sheets")
  }
}

// Fetch SEO agent data from the spreadsheet
export async function fetchAgentData() {
  try {
    const sheets = await initSheetsClient()

    // Assuming 'Agents' is the name of your sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Agents!A2:Z", // Start from A2 to skip headers
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return []
    }

    // Map spreadsheet rows to agent objects
    return rows.map((row) => ({
      id: row[0] || `AGT${Math.floor(Math.random() * 10000)}`,
      name: row[1] || "Unknown Agent",
      email: row[2] || "no-email@example.com",
      phone: row[3] || "No Phone",
      specialties: (row[4] || "").split(",").map((s) => s.trim()),
      capacity: Number.parseInt(row[5] || "40", 10), // Weekly capacity in hours
      // You can add more fields as needed
    }))
  } catch (error) {
    console.error("Error fetching agent data:", error)
    throw new Error("Failed to fetch agent data from Google Sheets")
  }
}
