// Endpoint for WebFinger requests

import { SITE_URL } from "../../consts";

export const prerender = false;

const ACCOUNTS = [
  {
    username: "toots",
    json: {
      subject: "acct:dominik@mastodon.design",
      aliases: [
        "https://mastodon.design/@dominik",
        "https://mastodon.design/users/dominik",
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: "https://mastodon.design/@dominik",
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: "https://mastodon.design/users/dominik",
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: "https://mastodon.design/authorize_interaction?uri={uri}",
        },
        {
          rel: "http://webfinger.net/rel/avatar",
          type: "image/jpeg",
          href: "https://cdn.masto.host/mastodondesign/accounts/avatars/109/284/796/890/120/955/original/9fdec81896647dcb.jpg",
        },
      ],
    },
  },
];

const hostname = new URL(SITE_URL).hostname;

export async function GET({ request }) {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!resource) {
    return new Response("Bad request", { status: 400 });
  }

  for (const account of ACCOUNTS) {
    if (resource === `acct:${account.username}@${hostname}`) {
      return new Response(JSON.stringify(account.json), {
        headers: {
          "Content-Type": "application/jrd+json",
        },
      });
    }
  }

  return new Response("Not found", { status: 404 });
}
