-- CreateIndex
CREATE UNIQUE INDEX "ConnectedProvider_userId_provider_key" ON "ConnectedProvider"("userId", "provider");
