import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    googleClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    spreadsheetId: !!process.env.SPREADSHEET_ID,
  })
}
