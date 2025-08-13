// Minimale Felder, die Prisma bei .create() ohne include zurückgibt
export type WorkspaceBase = {
  id: string;
  name: string;
  userId: string;
  createdAt: string; // oder Date, je nachdem wie du JSON parst
  updatedAt: string; // dito
};

// Für die Sidebar-Liste (summary)
export type WorkspaceSummary = {
  id: string;
  name: string;
  updatedAt: string;
};

// Detail-Ansicht (deine Controller mit include: { members, projects })
export type WorkspaceMember = {
  id: string;
  userId: string;
  workspaceId: string;
  role: "OWNER" | "MEMBER" | "GUEST";
};

export type WorkspaceProject = {
  id: string;
  name: string;
  // ...weitere Felder, falls vorhanden
};

export type WorkspaceDetail = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  members: WorkspaceMember[];
  projects: WorkspaceProject[];
};
