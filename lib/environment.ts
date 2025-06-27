export const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
export const isDevelopment =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview"

export function getEnvironmentName() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV || "development"
}
