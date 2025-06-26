export const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
export const isDevelopment =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview"

export function shouldUseMockData() {
  // Check if we have the required Google Sheets environment variables
  const hasGoogleSheetsConfig = process.env.SPREADSHEET_ID && 
                                process.env.GOOGLE_CLIENT_EMAIL && 
                                process.env.GOOGLE_PRIVATE_KEY &&
                                process.env.SPREADSHEET_ID !== "your_spreadsheet_id_here"

  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Check if we're in a preview environment based on hostname
    const isPreviewEnvironment = window.location.hostname.includes("vercel.app")

    // Check if we have the environment variable
    const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV

    // Use mock data in preview environments, when env vars are missing, or when Google Sheets isn't configured
    return isPreviewEnvironment || vercelEnv === "preview" || !hasGoogleSheetsConfig
  }

  // In server context, check the environment variable and Google Sheets config
  return process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" || !hasGoogleSheetsConfig
}

export function getEnvironmentName() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV || "development"
}
