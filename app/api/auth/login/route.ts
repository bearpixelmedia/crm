import { NextResponse } from "next/server"
import { google } from "googleapis"
import { JWT } from "google-auth-library"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export async function POST(request: Request) {
  const SPREADSHEET_ID = process.env.SPREADSHEET_ID
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Missing SPREADSHEET_ID environment variable" }, { status: 500 })
  }

  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const sheets = await initSheetsClient()

    // Fetch users from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Users!A2:Z",
    })

    const rows = response.data.values || []
    const users = rows.map((row) => ({
      id: row[0],
      name: row[1],
      email: row[2],
      passwordHash: row[3], // Store hashed passwords in sheets
      role: row[4] || "agent",
      avatar: row[5] || "",
      status: row[6] || "active",
    }))

    const user = users.find((u) => u.email === email && u.status === "active")

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For demo purposes, if no hash exists, use plain text comparison
    // In production, always use hashed passwords
    const isValidPassword = user.passwordHash.startsWith('$2a$') 
      ? await bcrypt.compare(password, user.passwordHash)
      : password === user.passwordHash

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
} 