import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import FusionAuthProvider from "next-auth/providers/fusionauth";

const fusionAuthIssuer = process.env.FUSIONAUTH_ISSUER;
const fusionAuthClientId = process.env.FUSIONAUTH_CLIENT_ID;
const fusionAuthClientSecret = process.env.FUSIONAUTH_CLIENT_SECRET;
const fusionAuthUrl = process.env.FUSIONAUTH_URL;
const fusionAuthTenantId = process.env.FUSIONAUTH_TENANT_ID;

const missingError = "missing in environment variables.";
if (!fusionAuthIssuer) {
  throw Error("FUSIONAUTH_ISSUER" + missingError);
}
if (!fusionAuthClientId) {
  throw Error("FUSIONAUTH_CLIENT_ID" + missingError);
}
if (!fusionAuthClientSecret) {
  throw Error("FUSIONAUTH_CLIENT_SECRET" + missingError);
}
if (!fusionAuthUrl) {
  throw Error("FUSIONAUTH_URL" + missingError);
}
if (!fusionAuthTenantId) {
  throw Error("FUSIONAUTH_TENANT_ID" + missingError);
}

export const authOptions: AuthOptions = {
  providers: [
    FusionAuthProvider({
      issuer: fusionAuthIssuer,
      clientId: fusionAuthClientId,
      clientSecret: fusionAuthClientSecret,
      wellKnown: `${fusionAuthUrl}/.well-known/openid-configuration/${fusionAuthTenantId}`,
      tenantId: fusionAuthTenantId, // Only required if you're using multi-tenancy
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const res = await fetch(`http://localhost:9011/api/user/${token.sub}`, {
        headers: {
          Authorization:
            "OvNYdCKmPGij4AA29xc2pYl1gxA5wB8lNyO714uxMjNDNnKHSj3dopa3",
        },
      });
      const data = await res.json();
      session.user = data.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
