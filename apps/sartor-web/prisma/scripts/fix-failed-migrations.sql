-- Doublons ConnectedProvider (bloquent l'index unique)
DELETE FROM "ConnectedProvider" a
USING "ConnectedProvider" b
WHERE a.id > b.id
  AND a."userId" = b."userId"
  AND a."provider" = b."provider";

-- Index unique ConnectedProvider (si migration a échoué avant création)
CREATE UNIQUE INDEX IF NOT EXISTS "ConnectedProvider_userId_provider_key"
  ON "ConnectedProvider"("userId", "provider");
