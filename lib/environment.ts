export const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
export const isDevelopment =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview"

export function shouldUseMockData() {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Check if we're in a preview environment based on hostname
    const isPreviewEnvironment = window.location.hostname.includes("vercel.app")

    // Check if we have the environment variable
    const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV

    // Use mock data in preview environments or when env vars are missing
    return isPreviewEnvironment || vercelEnv === "preview"
  }

  // In server context, check the environment variable
  return process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
}

export function getEnvironmentName() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV || "development"
}
