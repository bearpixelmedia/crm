import { NextResponse } from "next/server"
import { google } from "googleapis"

// Initialize the sheets API
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

export async function POST(request: Request) {
  try {
    const { sheet, data, range } = await request.json()

    if (!sheet || !data) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = process.env.SPREADSHEET_ID

    if (!spreadsheetId) {
      return NextResponse.json({ error: "Spreadsheet ID not configured" }, { status: 500 })
    }

    // Determine the range to write to
    const writeRange = range || `${sheet}!A2:Z`

    // Format data for the API
    let values
    if (Array.isArray(data)) {
      // If data is already an array of arrays
      values = data
    } else {
      // If data is a single object, convert to array
      values = [Object.values(data)]
    }

    // Write data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: writeRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({
      success: true,
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows,
    })
  } catch (error) {
    console.error("Error writing to Google Sheets:", error)
    return NextResponse.json({ error: "Failed to write to Google Sheets" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { sheet, data, range } = await request.json()

    if (!sheet || !data || !range) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = process.env.SPREADSHEET_ID

    if (!spreadsheetId) {
      return NextResponse.json({ error: "Spreadsheet ID not configured" }, { status: 500 })
    }

    // Format data for the API
    let values
    if (Array.isArray(data)) {
      // If data is already an array of arrays
      values = data
    } else {
      // If data is a single object, convert to array
      values = [Object.values(data)]
    }

    // Update data in the sheet
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheet}!${range}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({
      success: true,
      updatedRange: response.data.updatedRange,
      updatedRows: response.data.updatedRows,
    })
  } catch (error) {
    console.error("Error updating Google Sheets:", error)
    return NextResponse.json({ error: "Failed to update Google Sheets" }, { status: 500 })
  }
}
