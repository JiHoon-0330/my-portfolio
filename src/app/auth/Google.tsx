"use client";

export default function Google() {
  function onClick() {
    const gOauth2Client = window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      ux_mode: "redirect",
      scope:
        "profile email openid https://www.googleapis.com/auth/userinfo.profile",
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + "/auth/google",
    });
    gOauth2Client.requestCode();
  }

  return <button onClick={onClick}>구글로그인</button>;
}
