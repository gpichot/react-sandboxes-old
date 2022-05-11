import React from "react";
import { default as AppWithCustomContextProvider } from "./final";

import Box from "../../../components/Box";

const Navigation = () => {
  return <Box name="navigation">Navigation</Box>;
};
const Dashboard = () => {
  return <Box name="dashboard">Dashboard</Box>;
};

const CounterContext = React.createContext<
  | {
      count: number;
      increment: () => void;
    }
  | undefined
>(undefined);

function useCounterContext() {
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
}

function CounterView() {
  const { count } = useCounterContext();

  return (
    <Box style={{ display: "block" }} name="view">
      Count: {count}
    </Box>
  );
}

function CounterUpdater() {
  const { increment } = useCounterContext();

  return (
    <Box name="incrementer">
      <button onClick={increment}>Increment</button>
    </Box>
  );
}

export function App() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((count) => count + 1);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CounterContext.Provider value={{ count, increment }}>
        <Navigation />
        <Dashboard />
        <div>
          <CounterView />
          <CounterUpdater />
        </div>
      </CounterContext.Provider>
    </div>
  );
}

export const meta = {
  main: App,
  options: [
    {
      type: "app" as "app",
      name: "Using a custom context provider",
      component: AppWithCustomContextProvider,
    },
  ],
};

export default meta;
