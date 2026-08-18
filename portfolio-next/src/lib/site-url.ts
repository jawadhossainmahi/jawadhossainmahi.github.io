// Resolves the canonical site URL for SEO metadata (OpenGraph, sitemap,
// robots). Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically on every
// deploy, so this works out of the box with no config. Once a custom domain
// is chosen, set NEXT_PUBLIC_SITE_URL to override it.
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
