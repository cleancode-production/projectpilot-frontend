import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { LoginResponse } from "@/types/authTypes";

async function loginRequest(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // wichtig für refreshToken-Cookie
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login fehlgeschlagen");
  }

  return res.json();
}

export function useLogin() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
    onSuccess: (data: LoginResponse) => {
      setAuth(data.user, data.accessToken);
    },
  });
}
