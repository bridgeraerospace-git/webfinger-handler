export default {
  async fetch(request) {
    const url = new URL(request.url);
    const resource = url.searchParams.get("resource");

    // --- ENTRA ID CONFIGURATION ---
    const TENANT_ID = "16663179-f23a-4d36-85e2-5f061f488171"; // Replace with your Entra Tenant ID
    const MY_EMAIL = "s.bennett@bridgerfmsaero.com"; // Your Tailscale admin email
    
    // The Entra ID OIDC Issuer URL format
    const ISSUER_URL = `https://login.microsoftonline.com{TENANT_ID}/v2.0`;
    // ------------------------------

    if (resource === `acct:${MY_EMAIL}`) {
      const data = {
        subject: `acct:${MY_EMAIL}`,
        links: [
          {
            rel: "http://openid.net/specs/connect/1.0/issuer",
            href: ISSUER_URL
          }
        ]
      };

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/jrd+json" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
