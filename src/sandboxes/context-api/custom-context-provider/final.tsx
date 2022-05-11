import React from "react";

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

function CounterContextProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CounterContextProvider>
        <Navigation />
        <Dashboard />
        <div>
          <CounterView />
          <CounterUpdater />
        </div>
      </CounterContextProvider>
    </div>
  );
}
