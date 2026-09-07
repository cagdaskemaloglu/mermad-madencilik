import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Normally the middleware (src/middleware.ts) already detects the browser's
// language from the Accept-Language header and redirects "/" to "/tr" or
// "/en" before this page ever runs. This page is a safety net for the rare
// case a request reaches here without going through the middleware, so the
// language logic stays consistent even then.
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = acceptLanguage.toLowerCase().includes("tr") ? "tr" : "en";
  redirect(`/${locale}`);
}
