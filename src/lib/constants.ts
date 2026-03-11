export const siteURL = new URL(
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') as string | URL
);
export const siteOrigin = siteURL.origin;
