"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useLastWorkspaceDetail,
  useWorkspacesSummary,
} from "@/hooks/useWorkspaces";
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog";
import { RenameWorkspaceDialog } from "./RenameWorkspaceDialog";
import type { WorkspaceSummary } from "@/types/workspace";

export default function WorkspaceSwitcher() {
  const router = useRouter();
  const { data: last } = useLastWorkspaceDetail();
  const { data: list } = useWorkspacesSummary();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openRename, setOpenRename] = useState(false);

  // beim ersten Mount aktiven aus "last" übernehmen
  useEffect(() => {
    if (!activeId && last?.id) setActiveId(last.id);
  }, [last, activeId]);

  const activeName = useMemo(() => {
    if (!activeId || !list) return last?.name ?? "Workspace";
    return (
      list.find((w: WorkspaceSummary) => w.id === activeId)?.name ??
      last?.name ??
      "Workspace"
    );
  }, [activeId, list, last]);

  const selectWorkspace = (id: string) => {
    setActiveId(id);
    router.push(`/workspaces/${id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mt-10 w-full justify-between bg-card text-foreground hover:bg-card/90">
            <span className="text-xl truncate">{activeName}</span>
            <span className="text-xl">▾</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="start">
          {/* Liste aller Workspaces */}
          {(list ?? []).map((w: WorkspaceSummary) => (
            <DropdownMenuItem
              key={w.id}
              className="flex justify-between"
              onClick={() => selectWorkspace(w.id)}
            >
              <span className="truncate">{w.name}</span>
              {activeId === w.id && (
                <span className="text-xs opacity-60">aktiv</span>
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {/* Aktionen */}
          <DropdownMenuItem onClick={() => setOpenCreate(true)}>
            + Neuen Workspace erstellen…
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!activeId}
            onClick={() => setOpenRename(true)}
          >
            ✎ Aktuellen umbenennen…
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialoge */}
      <CreateWorkspaceDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreated={selectWorkspace}
      />
      <RenameWorkspaceDialog
        open={openRename}
        onOpenChange={setOpenRename}
        workspaceId={activeId ?? undefined}
      />
    </>
  );
}
