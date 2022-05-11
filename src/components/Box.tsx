import React from "react";
import styles from "./Box.module.scss";

export function useRenderCounter() {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.innerText = String(Number(ref.current.innerText || 0) + 1);
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        padding: 4,
        display: "inline-block",
      }}
      ref={ref}
    />
  );
}

export default function Box({
  children,
  name,
}: React.ComponentProps<"div"> & { name: string }) {
  const counter = useRenderCounter();
  return (
    <div className={styles.box}>
      {counter} <strong>{name}</strong>
      <div style={{ padding: 5 }}>{children}</div>
    </div>
  );
}
