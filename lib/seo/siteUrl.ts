export const getSiteUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof env === "string" && env.length > 0) {
    return env;
  }
  return "http://localhost:3000";
};
