type Config = {
  apiBaseUrl: string;
  dataLimit: number;
  siteUrl: string;
  authSecret: string;
};

export const config: Config = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  dataLimit: parseInt(process.env.NEXT_PUBLIC_DATA_LIMIT || "10"),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  authSecret: process.env.NEXTAUTH_SECRET || "secret",
};
