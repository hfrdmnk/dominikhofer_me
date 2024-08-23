// Endpoint for WebFinger requests
import { SITE_URL } from "../../consts";

export const prerender = false;

const ACCOUNTS = [
  {
    username: "toots",
    redirect:
      "https://mastodon.design/.well-known/webfinger?resource=acct:dominik@mastodon.design",
  },
  {
    username: "dominikhofer.me",
    redirect:
      "https://fed.brid.gy/.well-known/webfinger?resource=acct:dominikhofer.me@dominikhofer.me",
  },
  {
    username: "newsletter",
    redirect:
      "https://newsletter.dominikhofer.me/.well-known/webfinger?resource=acct:social@newsletter.dominikhofer.me",
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
