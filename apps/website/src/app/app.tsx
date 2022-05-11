import React from "react";
import { useSearchParams } from "react-router-dom";
import SandboxList, {
  SandboxCategory,
  SandboxItem,
} from "@/components/SandboxList";

import styles from "./App.module.scss";

import Sandboxes from "@/sandboxes";
import { Sandbox, SandboxModule, SandboxOption } from "@/sandboxes/types";

function useLoadSandbox(sandbox: Sandbox | undefined) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [module, setModule] = React.useState<SandboxModule | null>(null);

  React.useEffect(() => {
    if (!sandbox) return;
    setIsLoading(true);
    sandbox
      .component()
      .then((module) => {
        setModule(module);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sandbox]);

  return { isLoading, module };
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sandboxId = searchParams.get("sandboxId");
  const sandbox = Sandboxes.flatMap((x) => x.sandboxes).find(
    (x) => x.id === sandboxId
  );
  const sandboxModule = useLoadSandbox(sandbox);
  const SandboxComponent = sandboxModule.module?.default?.main;
  const [option, setOption] = React.useState<SandboxOption | null>(null);

  const setSandbox = (sandboxId: string) => {
    setSearchParams({ sandboxId });
  };

  const Component = option?.component || SandboxComponent;
  const options = sandboxModule.module?.default?.options;
  return (
    <div className={styles.main}>
      <SandboxList className={styles.sandboxList}>
        {Sandboxes.map(({ sandboxes, category }) => (
          <SandboxCategory key={category} title={category}>
            {sandboxes.map(({ title, id }) => (
              <SandboxItem
                key={title}
                title={title}
                id={id}
                onSelect={setSandbox}
              />
            ))}
          </SandboxCategory>
        ))}
      </SandboxList>
      {sandbox && (
        <div className={styles.sandboxCanvas}>
          <h1>{sandbox?.title}</h1>
          {options && (
            <>
              <button onClick={() => setOption(null)}>Clear</button>
              {sandboxModule.module?.default?.options?.map((option) => (
                <button key={option.name} onClick={() => setOption(option)}>
                  {option.name}
                </button>
              ))}
            </>
          )}
          <div className={styles.sandboxCanvasInner}>
            {sandboxModule.isLoading || !Component ? (
              <div>Loading...</div>
            ) : (
              <Component />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
