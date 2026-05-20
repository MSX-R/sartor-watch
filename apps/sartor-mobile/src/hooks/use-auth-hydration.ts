import { useEffect, useState } from "react";

import { useAuthStore } from "../store/auth.store";

export function useAuthHydration(): boolean {
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));

    return unsub;
  }, []);

  return hydrated;
}
