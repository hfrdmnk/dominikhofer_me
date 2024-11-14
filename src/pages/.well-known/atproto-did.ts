// Endpoint for AT Proto
const ATPROTO_DID = "did:plc:fthx2gjakdj4ynxxu5vysjty";

export async function GET() {
  return new Response(ATPROTO_DID, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
