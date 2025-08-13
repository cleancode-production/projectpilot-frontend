import { RegisterResponse } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

async function registerRequest(firstName: string, lastName: string, username: string, email: string, password: string) {
    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Registrierung fehlgeschlagen");
    }

  return res.json();
}

export function useRegister() {
    return useMutation({
        mutationFn: ({ firstName, lastName, username, email, password}: {firstName: string; lastName: string; username: string; email: string; password: string }) =>
            registerRequest(firstName, lastName, username, email, password),
        /* onSuccess: (data: RegisterResponse) => {

        } */
    })
}