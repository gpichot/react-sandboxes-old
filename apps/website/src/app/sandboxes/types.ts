export type SandboxOption = {
  type: "app";
  name: string;
  component: React.ComponentType;
};
export type SandboxModule = {
  default: {
    main: React.ComponentType;
    options?: SandboxOption[];
  };
};
export type Sandbox = {
  id: string;
  title: string;
  component: () => Promise<SandboxModule>;
};
