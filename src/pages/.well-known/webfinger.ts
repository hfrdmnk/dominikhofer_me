// Endpoint for WebFinger requests
import { SITE_URL } from "../../consts";

export const prerender = false;

const ACCOUNTS = [
  {
    username: "toots",
    redirect:
      "https://mastodon.design/.well-known/webfinger?resource=acct:dominik@mastodon.design",
  },
];

const hostname = new URL(SITE_URL).hostname;

export async function GET({ request, redirect }) {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!resource) {
    return new Response("Bad request", { status: 400 });
  }

  for (const account of ACCOUNTS) {
    if (resource === `acct:${account.username}@${hostname}`) {
      console.log(account.redirect);
      return redirect(account.redirect, 301);
    }
  }

  return new Response("Not found", { status: 404 });
}
