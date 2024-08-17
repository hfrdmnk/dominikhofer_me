const INSTANCE = "mastodon.design";
const USERNAME = "dominik";

export async function GET({ redirect }) {
  return redirect(
    `https://${INSTANCE}/.well-known/webfinger?resource=acct:${USERNAME}@${INSTANCE}`,
    301,
  );
}
