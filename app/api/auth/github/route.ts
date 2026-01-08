import { NextResponse } from "next/server";
import axios from "axios";

interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const { data } = await axios.post<TokenResponse>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        state,
      },
      { headers: { Accept: "application/json" } }
    );

    const res = NextResponse.redirect(
      process.env.NEXT_PUBLIC_APP_URL || "/"
    );
    // Set secure, httpOnly cookie with the token
    res.cookies.set("gh_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "OAuth token exchange failed" },
      { status: 500 }
    );
  }
}
