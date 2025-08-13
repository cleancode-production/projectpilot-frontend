import { useAuthStore } from "@/stores/authStore";

export async function refreshAccessToken() {
  const res = await fetch("http://localhost:5000/api/auth/refresh", {
    method: "POST",
    credentials: "include", // Cookie mit senden
  });

  if (!res.ok) {
    throw new Error("Konnte Access Token nicht erneuern");
  }

  const data = await res.json();
  useAuthStore
    .getState()
    .setAuth(useAuthStore.getState().user!, data.accessToken);
}
