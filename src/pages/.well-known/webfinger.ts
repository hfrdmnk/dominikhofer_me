// Endpoint for WebFinger
const WEBFINGER_JSON = {
  subject: "acct:dominikhofer@social.lol",
  aliases: [
    "https://social.lol/@dominikhofer",
    "https://social.lol/users/dominikhofer",
  ],
  links: [
    {
      rel: "http://webfinger.net/rel/profile-page",
      type: "text/html",
      href: "https://social.lol/@dominikhofer",
    },
    {
      rel: "self",
      type: "application/activity+json",
      href: "https://social.lol/users/dominikhofer",
    },
    {
      rel: "http://ostatus.org/schema/1.0/subscribe",
      template: "https://social.lol/authorize_interaction?uri={uri}",
    },
    {
      rel: "http://webfinger.net/rel/avatar",
      type: "image/jpeg",
      href: "https://media.social.lol/accounts/avatars/113/899/934/732/874/429/original/a383849354bb113f.jpg",
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
