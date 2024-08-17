const WEBFINGER_JSON = {
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
};

export async function GET() {
  return new Response(JSON.stringify(WEBFINGER_JSON), {
    headers: {
      "Content-Type": "application/activity+json",
    },
  });
}
