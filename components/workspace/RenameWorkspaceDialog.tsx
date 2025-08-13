"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRenameWorkspace } from "@/hooks/useWorkspaceMutations";
import { useWorkspaceDetail } from "@/hooks/useWorkspaces";

export function RenameWorkspaceDialog({
  open,
  onOpenChange,
  workspaceId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  workspaceId?: string;
}) {
  const { data: ws } = useWorkspaceDetail(workspaceId);
  const [name, setName] = useState("");
  const rename = useRenameWorkspace();

  useEffect(() => {
    setName(ws?.name ?? "");
  }, [ws]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) return;
    await rename.mutateAsync({ id: workspaceId, name });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Workspace umbenennen</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Input
            placeholder="Neuer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" disabled={!workspaceId || rename.isPending}>
            {rename.isPending ? "Speichere…" : "Speichern"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
