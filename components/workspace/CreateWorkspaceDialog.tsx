"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/useWorkspaceMutations";

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
  onCreated, // callback mit neuer id -> aktiv setzen/navigieren
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated?: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const create = useCreateWorkspace();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ws = await create.mutateAsync(name);
    setName("");
    onOpenChange(false);
    onCreated?.(ws.id);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setName("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuen Workspace erstellen</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Input
            placeholder="Workspace-Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? "Erstelle…" : "Erstellen"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
