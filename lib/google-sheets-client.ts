/**
 * Utility functions for interacting with Google Sheets
 */

// Function to add a new row to a Google Sheet
export async function addToSheet(sheet: string, data: any) {
  try {
    const response = await fetch("/api/google-sheets/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheet,
        data,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to add data to sheet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding data to sheet:", error)
    throw error
  }
}

// Function to update an existing row in a Google Sheet
export async function updateInSheet(sheet: string, range: string, data: any) {
  try {
    const response = await fetch("/api/google-sheets/write", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheet,
        range,
        data,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to update data in sheet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating data in sheet:", error)
    throw error
  }
}
