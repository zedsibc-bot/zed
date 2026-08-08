export function siteUrl(): string {
  const vercel = process.env.VERCEL_URL;
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercel ? `https://${vercel}` : undefined) ??
    "http://localhost:3000"
  );
}
