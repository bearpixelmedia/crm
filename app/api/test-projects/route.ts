import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    test: "NEW_ENDPOINT_WORKING",
    timestamp: new Date().toISOString(),
    projects: [{
      id: "TEST123",
      project: "Test Project Name",
      client: "Test Client Name", 
      email: "test@example.com",
      phone: "555-123-4567",
      testField: "CHANGES_WORKING",
      // Legacy fields
      name: "Test Project Name",
      clientId: "Test Client Name",
      type: "Test Type",
      status: "Test Status"
    }]
  })
} 