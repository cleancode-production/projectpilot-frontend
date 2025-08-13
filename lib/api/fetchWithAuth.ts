import { useAuthStore } from "@/stores/authStore";
import { refreshAccessToken } from "@/lib/auth/refreshAccessToken";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const { accessToken } = useAuthStore.getState();
  console.log("AccessToken im Store:", accessToken);

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`, // Einheitlich groß A
    },
    credentials: "include", // Falls Cookies gebraucht werden
  });

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
        credentials: "include",
      });
    } catch (err) {
      console.error("Auto-Refresh fehlgeschlagen", err);
      throw err;
    }
  }

  return res;
}
