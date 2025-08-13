import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";

import type { WorkspaceBase, WorkspaceDetail } from "@/types/workspace";

export function useCreateWorkspace() {
  const qc = useQueryClient();
  return useMutation<WorkspaceBase, Error, string>({
    mutationFn: async (name: string) => {
      const res = await fetchWithAuth("http://localhost:5000/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).message || "Erstellen fehlgeschlagen");
      }
      return res.json();
    },
    onSuccess: (workspace: WorkspaceBase) => {
      qc.invalidateQueries({ queryKey: ["workspaces", "summary"] });
      qc.invalidateQueries({ queryKey: ["workspaces", "last"] });
      qc.setQueryData(["workspaces", workspace.id], workspace);
    },
  });
}

export function useRenameWorkspace() {
  const qc = useQueryClient();
  return useMutation<WorkspaceDetail, Error, { id: string; name: string }>({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const res = await fetchWithAuth(
        `http://localhost:5000/api/workspaces/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).message || "Umbenennen fehlgeschlagen");
      }
      return res.json();
    },
    onSuccess: (workspace: WorkspaceDetail) => {
      qc.invalidateQueries({ queryKey: ["workspaces", "summary"] });
      qc.invalidateQueries({ queryKey: ["workspaces", "last"] });
      qc.invalidateQueries({ queryKey: ["workspaces", workspace.id] });
    },
  });
}
