"use client";

import { Button } from "flowbite-react";

export default function GoogleButton() {
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

  return <Button onClick={onClick}>구글로그인</Button>;
}
