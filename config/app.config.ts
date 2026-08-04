// server base url
const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:4000";

export const APP_CONFIG = {
  app: {
    url: URL,
    name: "app",
    slogan: "app",
    siteName: "LOGO",
    meta: {
      description: "app",
      keywords: "app",
    },
    apiUrl: `${URL}/api`,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
