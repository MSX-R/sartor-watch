export const PROVIDERS_CONFIG = {
  xiaomi: {
    clientId: process.env.XIAOMI_CLIENT_ID ?? "",

    clientSecret: process.env.XIAOMI_CLIENT_SECRET ?? "",

    redirectUri: process.env.XIAOMI_REDIRECT_URI ?? "",
  },
};
