import { Sandbox, SandboxModule } from "./types";
export type SandboxSection = {
  category: string;
  sandboxes: Sandbox[];
};

export const Sandboxes: SandboxSection[] = [
  {
    category: "Context API",
    sandboxes: [
      {
        id: "context-api:custom-content-provider",
        title: "Custom Context Provider",
        component: () => import("./context-api/custom-context-provider"),
      },
    ],
  },
];

export default Sandboxes;
