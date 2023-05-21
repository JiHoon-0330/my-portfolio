import { ProviderPageProps } from "@/app/auth/[provider]/page";
import { OAuth2Client } from "google-auth-library";

export async function googleLogin({
  params: { provider },
  searchParams,
}: ProviderPageProps) {
  const url = "https://www.googleapis.com/oauth2/v4/token";
  const body = new URLSearchParams({
    ...searchParams,
    redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + "/auth/google",
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  })?.toString();

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const json = (await resp.json()) as {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
  };

  const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  console.log({ json });

  const ticket = await client?.verifyIdToken({
    idToken: json?.id_token,
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });

  const payload = ticket?.getPayload() as {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
  };

  if (!payload?.email_verified) {
    throw new Error("Email not verified");
  }

  return { provider, email: payload?.email };
}
