// Adapted form https://www.seanmcp.com/articles/use-your-domain-on-mastodon-with-astro/

export const prerender = false;

const INSTANCE = "mastodon.design";
const USERNAME = "dominik";

export async function GET() {
  const response = await fetch(
    `https://${INSTANCE}/.well-known/webfinger?resource=acct:${USERNAME}@${INSTANCE}`,
  );
  const data = await response.json();

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
