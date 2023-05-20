interface Window {
  google: any;
}

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SHA_KEY: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
  }
}
