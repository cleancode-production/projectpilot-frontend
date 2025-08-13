import { useAuthStore } from "@/stores/authStore";
import { refreshAccessToken } from "@/lib/auth/refreshAccessToken";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const { accessToken } = useAuthStore.getState();

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Wenn Access Token abgelaufen ist, versuche Refresh
  if (res.status === 401) {
    try {
      await refreshAccessToken();
      const { accessToken: newToken } = useAuthStore.getState();

      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } catch (err) {
      console.error("Auto-Refresh fehlgeschlagen", err);
      throw err;
    }
  }

  return res;
}
