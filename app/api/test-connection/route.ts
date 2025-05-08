import { NextResponse } from "next/server"
import { testGoogleSheetsConnection } from "@/lib/test-connection"

export async function GET() {
  try {
    const result = await testGoogleSheetsConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Successfully connected to Google Sheets",
        data: {
          clientCount: result.clients.length,
          projectCount: result.projects.length,
          agentCount: result.agents.length,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to connect to Google Sheets",
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while testing the connection",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
