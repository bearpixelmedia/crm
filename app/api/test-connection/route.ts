import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test the Google Sheets API route
    const response = await fetch(
      new URL("/api/google-sheets?type=all", process.env.VERCEL_URL || "http://localhost:3000"),
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          success: false,
          message: "Failed to connect to Google Sheets",
          error: errorData.error || "Unknown error",
        },
        { status: 500 },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Google Sheets",
      data: {
        clientCount: data.clients?.length || 0,
        projectCount: data.projects?.length || 0,
        agentCount: data.agents?.length || 0,
      },
    })
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
