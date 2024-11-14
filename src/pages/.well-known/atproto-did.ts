// Endpoint for AT Proto
const ATPROTO_DID = "did:plc:lta2nlofz3f7tk4tpsg5vxfa";

export async function GET() {
  return new Response(JSON.stringify(ATPROTO_DID), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
