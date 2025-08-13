// hooks/useWorkspaceQueries.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";

export type WorkspaceSummary = { id: string; name: string; updatedAt: string };

export type WorkspaceDetail = {
  id: string;
  name: string;
  updatedAt: string;
  members: Array<{
    id: string;
    userId: string;
    role: "OWNER" | "MEMBER" | "GUEST";
  }>;
  projects: Array<{ id: string; name: string }>;
};

// ---- Summary-Liste (Dropdown) ----
export function useWorkspacesSummary() {
  return useQuery<WorkspaceSummary[]>({
    queryKey: ["workspaces", "summary"] as const,
    queryFn: async () => {
      const res = await fetchWithAuth(
        "http://localhost:5000/api/workspaces?view=summary"
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Fehler beim Laden der Workspaces");
      }
      return res.json() as Promise<WorkspaceSummary[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 Min
    // gcTime: 30 * 60 * 1000, // optional: 30 Min im Cache behalten, auch wenn unbenutzt
  });
}

// ---- Workspace-Detail (konkrete ID) ----
export function useWorkspaceDetail(id?: string) {
  const qc = useQueryClient();

  // Key nur bauen, wenn id existiert
  const key = id
    ? (["workspaces", { id }] as const)
    : (["workspaces", { id: null }] as const);

  return useQuery<WorkspaceDetail>({
    queryKey: key,
    enabled: !!id,
    queryFn: async () => {
      const res = await fetchWithAuth(
        `http://localhost:5000/api/workspaces/${id}`
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Fehler beim Laden des Workspace");
      }
      return res.json() as Promise<WorkspaceDetail>;
    },
    staleTime: 2 * 60 * 1000,
    // Optional: weicheres UI beim Wechseln (zeigt alten Inhalt, refetch im BG)
    placeholderData: () => {
      // Falls zuvor per 'last' geprimt:
      const seeded = id
        ? qc.getQueryData<WorkspaceDetail>(["workspaces", { id }])
        : undefined;
      return seeded;
    },
  });
}

// ---- Zuletzt genutzter Workspace (voll) + Priming ----
export function useLastWorkspaceDetail() {
  const qc = useQueryClient();

  return useQuery<WorkspaceDetail>({
    queryKey: ["workspaces", "last"] as const,
    queryFn: async () => {
      const res = await fetchWithAuth(
        "http://localhost:5000/api/workspaces/last"
      );
      if (!res.ok) {
        const err = await parseOrDefault(res);
        throw new Error((err as any).message || "Kein Workspace gefunden");
      }
      const data = (await res.json()) as WorkspaceDetail;

      // Priming: Detail-Cache unter ["workspaces", { id }]
      qc.setQueryData<WorkspaceDetail>(["workspaces", { id: data.id }], data);

      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}
