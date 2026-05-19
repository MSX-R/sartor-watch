export interface ProviderConnection {
  accessToken: string;

  refreshToken?: string;

  expiresAt?: Date;

  providerUserId?: string;
}
