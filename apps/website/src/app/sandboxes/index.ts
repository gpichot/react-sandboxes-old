import { Sandbox, SandboxModule } from "./types";
import * as FirstSandbox from "@sandboxes/context-api/custom-context-provider";
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
        component: () => Promise.resolve(FirstSandbox),
      },
    ],
  },
];

export default Sandboxes;
