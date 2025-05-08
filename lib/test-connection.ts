import { fetchClientData, fetchProjectData, fetchAgentData } from "./google-sheets"

export async function testGoogleSheetsConnection() {
  console.log("Testing Google Sheets connection...")

  try {
    // Test client data fetch
    console.log("Fetching client data...")
    const clients = await fetchClientData()
    console.log(`Successfully fetched ${clients.length} clients`)

    // Test project data fetch
    console.log("Fetching project data...")
    const projects = await fetchProjectData()
    console.log(`Successfully fetched ${projects.length} projects`)

    // Test agent data fetch
    console.log("Fetching agent data...")
    const agents = await fetchAgentData()
    console.log(`Successfully fetched ${agents.length} agents`)

    return {
      success: true,
      clients,
      projects,
      agents,
    }
  } catch (error) {
    console.error("Connection test failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
