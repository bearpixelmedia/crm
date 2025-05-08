// Detect the current environment
export const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
export const isDevelopment = process.env.NEXT_PUBLIC_VERCEL_ENV === "development" || !process.env.NEXT_PUBLIC_VERCEL_ENV

// Helper function to determine if we should use real or mock data
export const shouldUseMockData = () => {
  // Always use real data in production if possible
  if (isProduction) return false

  // In preview or development, check if we have the required environment variables
  const hasRequiredEnvVars =
    !!process.env.GOOGLE_CLIENT_EMAIL && !!process.env.GOOGLE_PRIVATE_KEY && !!process.env.SPREADSHEET_ID

  // If we're missing any required env vars, use mock data
  return !hasRequiredEnvVars
}
